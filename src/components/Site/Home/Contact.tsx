import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { toast } from 'sonner';

import { submitTrackingSupport } from '@/api/apiEndpoints';
import { rememberSupportSession } from '@/lib/supportSession';

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
      rememberSupportSession(response, form.trackingId.trim());
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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-slate-900 sm:px-6 sm:py-24 lg:px-8">
            {reference ? (
              <div className="flex min-h-96 flex-col items-center justify-center border-y border-slate-200 py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-sky-100 text-sky-700"><CheckCircle2 className="size-8" /></div>
                <h3 className="mt-6 font-title text-3xl font-medium">Request received</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">The owner of this flight record can now review your message and contact you by email.</p>
                <p className="mt-6 rounded-lg bg-[#071a33] px-4 py-2 font-mono text-xs text-white">Reference {reference}</p>
                <button type="button" onClick={() => setReference('')} className="mt-8 text-sm font-semibold text-blue-700 hover:text-blue-900">Send another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="border-b border-slate-200 pb-8">
                  <h2 className="font-title text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">Contact flight support</h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    Enter the booking or tracking ID from your flight page and describe what you need help with. The responsible team will reply by email.
                  </p>
                </div>
                <div className="space-y-5 pt-8">
                  <label className="block text-sm font-semibold">Booking or tracking ID
                    <input required value={form.trackingId} onChange={(event) => update('trackingId', event.target.value)} placeholder="e.g. FL-7284" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 font-mono text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-semibold">Passenger name
                      <input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Full name" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-semibold">Email address
                      <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                    </label>
                  </div>
                  <label className="block text-sm font-semibold">Subject
                    <input required maxLength={160} value={form.subject} onChange={(event) => update('subject', event.target.value)} placeholder="Schedule, passenger details, flight status…" className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  </label>
                  <label className="block text-sm font-semibold">Message
                    <textarea required maxLength={5000} rows={6} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us what you need help with." className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
                  </label>
                  <button type="submit" disabled={isSending} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    <Send className="size-4" /> {isSending ? 'Sending…' : 'Send support request'}
                  </button>
                </div>
              </form>
            )}
      </div>
    </section>
  );
}
