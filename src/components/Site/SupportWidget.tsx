import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { ArrowLeft, Headphones, LoaderCircle, MailCheck, MessageCircle, Plus, Send, X } from 'lucide-react';
import Pusher from 'pusher-js';
import { toast } from 'sonner';

import {
  authorizeTrackingSupportRealtime,
  confirmSupportEmailVerification,
  getTrackingSupportThread,
  requestSupportEmailVerification,
  sendTrackingSupportMessage,
  submitTrackingSupport,
} from '@/api/apiEndpoints';
import {
  activateSupportSession,
  forgetSupportSession,
  loadSupportSession,
  loadSupportSessions,
  refreshSupportSession,
  rememberSupportSession,
  SUPPORT_SESSION_EVENT,
} from '@/lib/supportSession';
import type { StoredSupportSession, SupportEmailVerificationChallenge, TrackingSupportThread } from '@/types';

function supportError(error: unknown, fallback: string) {
  if (isAxiosError(error) && typeof error.response?.data?.detail === 'string') return error.response.data.detail;
  return fallback;
}

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState<StoredSupportSession[]>(() => loadSupportSessions());
  const [session, setSession] = useState<StoredSupportSession | null>(() => loadSupportSession());
  const [view, setView] = useState<'list' | 'new' | 'thread'>(() => loadSupportSession() ? 'thread' : 'new');
  const [thread, setThread] = useState<TrackingSupportThread | null>(null);
  const [trackingId, setTrackingId] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationChallenge, setVerificationChallenge] = useState<SupportEmailVerificationChallenge | null>(null);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingThread, setLoadingThread] = useState(Boolean(session));
  const [threadError, setThreadError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshThread = useCallback(async (activeSession: StoredSupportSession) => {
    try {
      const nextThread = await getTrackingSupportThread(activeSession);
      setThread(nextThread);
      if (
        activeSession.channel !== nextThread.channel
        || activeSession.realtime.enabled !== nextThread.realtime.enabled
        || activeSession.realtime.key !== nextThread.realtime.key
        || activeSession.realtime.cluster !== nextThread.realtime.cluster
        || activeSession.trackingId !== nextThread.tracking_id
      ) {
        const refreshed = refreshSupportSession({
          ...activeSession,
          trackingId: nextThread.tracking_id,
          channel: nextThread.channel,
          realtime: nextThread.realtime,
        });
        setSession(refreshed);
        setSessions(loadSupportSessions());
      }
      setThreadError(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        const remaining = forgetSupportSession(activeSession.id);
        setSessions(remaining);
        setSession(null);
        setThread(null);
        setView(remaining.length ? 'list' : 'new');
      } else {
        setThreadError(true);
      }
    } finally {
      setLoadingThread(false);
    }
  }, []);

  useEffect(() => {
    if (session) refreshThread(session);
  }, [refreshThread, session]);

  useEffect(() => {
    const syncSession = (event: Event) => {
      const next = (event as CustomEvent<StoredSupportSession | null>).detail;
      setSessions(loadSupportSessions());
      setSession(next);
      if (next) {
        setOpen(true);
        setLoadingThread(true);
        setView('thread');
      }
    };
    window.addEventListener(SUPPORT_SESSION_EVENT, syncSession);
    return () => window.removeEventListener(SUPPORT_SESSION_EVENT, syncSession);
  }, []);

  useEffect(() => {
    if (!session?.realtime.enabled) return;
    const pusher = new Pusher(session.realtime.key, {
      cluster: session.realtime.cluster,
      forceTLS: true,
      channelAuthorization: {
        customHandler: async (params, callback) => {
          try {
            callback(null, await authorizeTrackingSupportRealtime(session, params.socketId, params.channelName));
          } catch (error) {
            callback(error instanceof Error ? error : new Error('Realtime authorization failed.'), null);
          }
        },
      },
    });
    const channel = pusher.subscribe(session.channel);
    const update = () => refreshThread(session);
    channel.bind('support.updated', update);
    channel.bind('support.customer_message', update);
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(session.channel);
      pusher.disconnect();
    };
  }, [refreshThread, session]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [thread?.conversation.length, open]);

  const startConversation = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      if (!verificationChallenge) {
        const challenge = await requestSupportEmailVerification({
          tracking_id: trackingId.trim(),
          source: 'flight_lookup',
          email: email.trim(),
        });
        setVerificationChallenge(challenge);
        setVerificationCode('');
        toast.success('Verification code sent');
        return;
      }
      const grant = await confirmSupportEmailVerification(verificationChallenge.challenge_id, verificationCode.trim());
      const response = await submitTrackingSupport({
        tracking_id: trackingId.trim(),
        source: 'flight_lookup',
        customer_email: grant.email,
        verification_token: grant.verification_token,
      });
      const next = rememberSupportSession(response, trackingId.trim());
      setSessions(loadSupportSessions());
      setSession(next);
      setLoadingThread(true);
      setView('thread');
      setTrackingId('');
      setEmail('');
      setVerificationCode('');
      setVerificationChallenge(null);
    } catch (error) {
      toast.error(supportError(error, 'Could not verify your email or start the conversation. Try again.'));
    } finally {
      setBusy(false);
    }
  };

  const sendReply = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!session || !reply.trim() || busy) return;
    setBusy(true);
    try {
      await sendTrackingSupportMessage(session, reply.trim());
      setReply('');
      await refreshThread(session);
    } catch {
      toast.error('Your message could not be sent. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const showConversationList = () => {
    setSession(null);
    setThread(null);
    setReply('');
    setView('list');
  };

  const showNewConversation = () => {
    setSession(null);
    setThread(null);
    setTrackingId('');
    setEmail('');
    setVerificationCode('');
    setVerificationChallenge(null);
    setView('new');
  };

  const openConversation = (id: string) => {
    const next = activateSupportSession(id);
    if (!next) return;
    setSession(next);
    setThread(null);
    setThreadError(false);
    setLoadingThread(true);
    setView('thread');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100000] sm:bottom-7 sm:right-7">
      {open && (
        <section aria-label="Flight support conversation" className="mb-3 flex h-[min(650px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-sky-200/15 bg-[#071425] shadow-[0_24px_80px_rgba(3,13,28,0.5)]">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#081a30] px-3 py-3 text-white">
            <div className="flex min-w-0 items-center gap-2">
              {view !== 'list' && sessions.length > 0 && <button type="button" onClick={showConversationList} aria-label="Back to conversations" className="grid size-9 shrink-0 place-items-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="size-4" /></button>}
              <div className="min-w-0"><p className="truncate font-title text-sm font-semibold">{view === 'list' ? 'Your conversations' : view === 'new' ? 'New conversation' : 'Flight support'}</p><p className="mt-0.5 truncate text-[11px] text-white/45">{view === 'thread' ? (session?.realtime.enabled ? 'Live conversation' : 'Replies continue by email') : 'Help with your flight record'}</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support" className="grid size-9 place-items-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
          </header>

          {view === 'list' ? (
            <div className="flex flex-1 flex-col overflow-hidden bg-[#071425]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-xs text-white/40">Continue a previous request</p>
                <button type="button" onClick={showNewConversation} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-sky-300 px-3 text-xs font-semibold text-[#041225]"><Plus className="size-3.5" /> New chat</button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2">{sessions.map((item) => (
                  <button key={item.id} type="button" onClick={() => openConversation(item.id)} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-sky-300/30 hover:bg-white/[0.07]">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-sky-300/10 text-sky-300"><MessageCircle className="size-4" /></span>
                    <span className="min-w-0 flex-1"><span className="block truncate font-mono text-sm font-medium text-white/85">{item.trackingId || `Request ${item.id.slice(0, 8).toUpperCase()}`}</span><span className="mt-1 block text-[11px] text-white/40">Open conversation</span></span>
                  </button>
                ))}</div>
              </div>
            </div>
          ) : view === 'thread' && session ? (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#071425] p-4">
                {loadingThread ? <div className="grid h-full place-items-center"><LoaderCircle className="size-5 animate-spin text-sky-300" /></div> : threadError && !thread ? <div className="grid h-full place-items-center text-center"><div><p className="text-sm text-white/55">The conversation could not load.</p><button type="button" onClick={() => refreshThread(session)} className="mt-3 text-sm font-semibold text-sky-300">Try again</button></div></div> : thread?.conversation.map((entry) => (
                  <article key={entry.id} className={`flex ${entry.direction === 'customer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${entry.direction === 'customer' ? 'rounded-br-md bg-sky-300 text-[#041225]' : 'rounded-bl-md border border-white/10 bg-white/[0.06] text-white/75'}`}>
                      <p className="whitespace-pre-wrap break-words">{entry.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <form onSubmit={sendReply} className="border-t border-white/10 bg-[#081a30] p-3">
                <div className="flex items-end gap-2 rounded-xl border border-white/15 bg-white/[0.04] p-2 focus-within:border-sky-300/60">
                  <textarea aria-label="Message support" rows={1} maxLength={10000} value={reply} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void sendReply(); } }} placeholder="Write a message" className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  <button type="submit" disabled={busy || !reply.trim()} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-lg bg-sky-300 text-[#041225] disabled:opacity-40"><Send className="size-4" /></button>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={startConversation} className="flex flex-1 flex-col justify-center p-5 text-white">
              {!verificationChallenge ? <>
                <div><h2 className="font-title text-xl font-medium">Verify your email</h2><p className="mt-1 text-xs leading-5 text-white/45">We’ll use it to notify you when flight support replies.</p></div>
                <input required autoFocus value={trackingId} onChange={(event) => setTrackingId(event.target.value)} placeholder="Tracking ID" className="mt-6 h-12 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 font-mono text-sm outline-none focus:border-sky-300/70" />
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="mt-3 h-12 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 text-sm outline-none focus:border-sky-300/70" />
                <button type="submit" disabled={busy || !trackingId.trim() || !email.trim()} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-300 font-semibold text-[#041225] disabled:opacity-50">{busy ? <LoaderCircle className="size-4 animate-spin" /> : <MailCheck className="size-4" />} Send verification code</button>
              </> : <>
                <div><h2 className="font-title text-xl font-medium">Check your inbox</h2><p className="mt-1 text-xs leading-5 text-white/45">Enter the four-digit code sent to {verificationChallenge.email_hint}.</p></div>
                <input required autoFocus inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{4}" maxLength={4} value={verificationCode} onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, ''))} placeholder="0000" aria-label="Verification code" className="mt-6 h-14 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 text-center font-mono text-xl tracking-[0.35em] outline-none focus:border-sky-300/70" />
                <button type="submit" disabled={busy || verificationCode.length !== 4} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-300 font-semibold text-[#041225] disabled:opacity-50">{busy ? <LoaderCircle className="size-4 animate-spin" /> : <MessageCircle className="size-4" />} Verify and start chat</button>
                <button type="button" onClick={() => { setVerificationChallenge(null); setVerificationCode(''); }} className="mt-3 text-xs font-medium text-white/40 hover:text-white/75">Use a different email</button>
              </>}
            </form>
          )}
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close flight support' : 'Open flight support'} className="ml-auto grid size-14 place-items-center rounded-2xl bg-sky-300 text-[#041225] shadow-[0_14px_35px_rgba(125,211,252,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(125,211,252,0.36)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
        {open ? <X className="size-5" /> : session ? <MessageCircle className="size-5" /> : <Headphones className="size-5" />}
      </button>
    </div>
  );
}
