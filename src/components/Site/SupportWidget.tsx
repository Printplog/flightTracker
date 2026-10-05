import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { Headphones, LoaderCircle, MessageCircle, Send, X } from 'lucide-react';
import Pusher from 'pusher-js';
import { toast } from 'sonner';

import {
  authorizeTrackingSupportRealtime,
  getTrackingSupportThread,
  sendTrackingSupportMessage,
  submitTrackingSupport,
} from '@/api/apiEndpoints';
import {
  forgetSupportSession,
  loadSupportSession,
  rememberSupportSession,
  SUPPORT_SESSION_EVENT,
} from '@/lib/supportSession';
import type { StoredSupportSession, TrackingSupportThread } from '@/types';

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<StoredSupportSession | null>(() => loadSupportSession());
  const [thread, setThread] = useState<TrackingSupportThread | null>(null);
  const [trackingId, setTrackingId] = useState('');
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingThread, setLoadingThread] = useState(Boolean(session));
  const [threadError, setThreadError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshThread = useCallback(async (activeSession: StoredSupportSession) => {
    try {
      setThread(await getTrackingSupportThread(activeSession));
      setThreadError(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        forgetSupportSession();
        setSession(null);
        setThread(null);
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
      setSession(next);
      if (next) {
        setOpen(true);
        setLoadingThread(true);
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
      const response = await submitTrackingSupport({
        tracking_id: trackingId.trim(),
        source: 'flight_lookup',
      });
      const next = rememberSupportSession(response);
      setSession(next);
      setLoadingThread(true);
      setTrackingId('');
    } catch {
      toast.error('Could not start the conversation. Check your tracking ID and details.');
    } finally {
      setBusy(false);
    }
  };

  const sendReply = async (event: FormEvent) => {
    event.preventDefault();
    if (!session || !reply.trim()) return;
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

  const startAnother = () => {
    forgetSupportSession();
    setSession(null);
    setThread(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100000] sm:bottom-7 sm:right-7">
      {open && (
        <section aria-label="Flight support conversation" className="mb-3 flex h-[min(650px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-sky-200/15 bg-[#071425] shadow-[0_24px_80px_rgba(3,13,28,0.5)]">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#081a30] px-5 py-4 text-white">
            <div><p className="font-title text-sm font-semibold">Flight support</p><p className="mt-0.5 text-[11px] text-white/45">{session?.realtime.enabled ? 'Live conversation' : 'Replies continue by email'}</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support" className="grid size-9 place-items-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
          </header>

          {session ? (
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
                  <textarea aria-label="Message support" rows={1} maxLength={10000} value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a message" className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  <button type="submit" disabled={busy || !reply.trim()} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-lg bg-sky-300 text-[#041225] disabled:opacity-40"><Send className="size-4" /></button>
                </div>
                <button type="button" onClick={startAnother} className="mt-2 text-xs font-medium text-white/35 hover:text-white/70">Start a different request</button>
              </form>
            </>
          ) : (
            <form onSubmit={startConversation} className="flex flex-1 flex-col justify-center p-5 text-white">
              <div><h2 className="font-title text-xl font-medium">Start a conversation</h2><p className="mt-1 text-xs leading-5 text-white/45">Enter the tracking ID on your flight record.</p></div>
              <input required autoFocus value={trackingId} onChange={(event) => setTrackingId(event.target.value)} placeholder="Tracking ID" className="mt-6 h-12 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 font-mono text-sm outline-none focus:border-sky-300/70" />
              <button type="submit" disabled={busy || !trackingId.trim()} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-300 font-semibold text-[#041225] disabled:opacity-50">{busy ? <LoaderCircle className="size-4 animate-spin" /> : <MessageCircle className="size-4" />} Continue</button>
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
