import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, Plane, Send, TicketCheck } from 'lucide-react';
import { toast } from 'sonner';

import { submitTrackingSupport } from '@/api/apiEndpoints';

type ContactFormProps = {
  trackingId?: string;
};

const EMPTY_FORM = {
  trackingId: '',
  name: '',
  email: '',
  subject: '',
  message: '',
};

function supportError(error: unknown) {
  if (typeof error === 'object' && error && 'response' in error) {
    const response = (error as { response?: { data?: Record<string, string | string[]> } }).response;
    const data = response?.data;
    const detail = data?.tracking_id || data?.detail || data?.error;
    if (Array.isArray(detail)) return detail[0];
    if (typeof detail === 'string') return detail;
  }
  return 'We could not send your request. Check the details and try again.';
}

export default function ContactPage({ trackingId = '' }: ContactFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, trackingId });
  const [isSending, setIsSending] = useState(false);
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (trackingId) setForm((current) => ({ ...current, trackingId }));
  }, [trackingId]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const response = await submitTrackingSupport({
        tracking_id: form.trackingId.trim(),
        source: 'flight_lookup',
        customer_name: form.name.trim(),
        customer_email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setReference(response.id.slice(0, 8).toUpperCase());
      setForm((current) => ({ ...EMPTY_FORM, trackingId: current.trackingId }));
      toast.success('Support request received');
    } catch (error) {
      toast.error(supportError(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#071a33] px-4 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(125,180,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(125,180,255,.15) 1px, transparent 1px)', backgroundSize: '46px 46px' }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3 text-sky-300"><Plane className="size-5" /><span className="text-sm font-semibold">Passenger support</span></div>
            <h2 className="mt-4 max-w-2xl font-title text-4xl font-bold tracking-tight sm:text-5xl">A direct line for your flight record</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/55">Your booking or tracking ID connects this request to the team that owns the flight record.</p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_32px_90px_rgba(0,0,0,.35)] lg:grid-cols-[1fr_0.55fr]">
          <div className="p-7 text-slate-900 sm:p-10">
            {reference ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-sky-100 text-sky-700"><CheckCircle2 className="size-8" /></div>
                <h3 className="mt-6 font-title text-3xl font-bold">Request cleared for review</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">The owner of this flight record can now review your message and contact you by email.</p>
                <p className="mt-6 rounded-lg bg-[#071a33] px-4 py-2 font-mono text-xs text-white">Reference {reference}</p>
                <button type="button" onClick={() => setReference('')} className="mt-8 text-sm font-semibold text-blue-700 hover:text-blue-900">Send another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div><h3 className="font-title text-2xl font-bold">Contact flight support</h3><p className="mt-2 text-sm text-slate-500">All fields are required.</p></div>
                <label className="block text-sm font-semibold">Booking or tracking ID
                  <input required value={form.trackingId} onChange={(event) => update('trackingId', event.target.value)} placeholder="e.g. FL-7284" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold">Passenger name
                    <input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Full name" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                  </label>
                  <label className="block text-sm font-semibold">Email address
                    <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                  </label>
                </div>
                <label className="block text-sm font-semibold">Subject
                  <input required maxLength={160} value={form.subject} onChange={(event) => update('subject', event.target.value)} placeholder="Schedule, passenger details, flight status…" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                </label>
                <label className="block text-sm font-semibold">Message
                  <textarea required maxLength={5000} rows={6} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us what you need help with." className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                </label>
                <button type="submit" disabled={isSending} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                  <Send className="size-4" /> {isSending ? 'Sending…' : 'Send support request'}
                </button>
              </form>
            )}
          </div>

          <aside className="border-t border-slate-200 bg-[#eef6ff] p-7 text-slate-900 sm:p-10 lg:border-l lg:border-t-0">
            <TicketCheck className="size-10 text-blue-700" />
            <h3 className="mt-6 font-title text-2xl font-bold">Before you send</h3>
            <ol className="mt-7 space-y-6 text-sm leading-6 text-slate-600">
              <li><span className="mr-3 inline-flex size-7 items-center justify-center rounded-full bg-blue-700 font-bold text-white">1</span>Copy the ID exactly as it appears.</li>
              <li><span className="mr-3 inline-flex size-7 items-center justify-center rounded-full bg-blue-700 font-bold text-white">2</span>Describe the flight detail that needs attention.</li>
              <li><span className="mr-3 inline-flex size-7 items-center justify-center rounded-full bg-blue-700 font-bold text-white">3</span>Watch the email address you provide for a reply.</li>
            </ol>
            <div className="mt-10 flex gap-3 rounded-2xl border border-blue-200 bg-white/70 p-4 text-sm leading-6 text-slate-600"><Mail className="mt-0.5 size-5 shrink-0 text-blue-700" />Email replies are handled by the owner of your flight record.</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
