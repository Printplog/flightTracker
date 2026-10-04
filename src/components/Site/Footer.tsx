import { Headphones, Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#041225] px-4 py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><img src="/logo.png" alt="" className="h-9 w-auto" /><p className="text-xl font-bold">MyFlightLookup</p></div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">Review the flight information attached to your tracking ID and reach the responsible support team from the same page.</p>
        </div>
        <div>
          <p className="font-semibold text-sky-300">Navigate</p>
          <div className="mt-5 space-y-3 text-sm text-white/60"><a className="block hover:text-white" href="/#hero">Track a flight</a><a className="block hover:text-white" href="/#faq">Flight help</a><a className="block hover:text-white" href="/#contact">Contact support</a></div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Headphones className="size-6 text-sky-300" />
          <p className="mt-4 font-semibold">Question about a flight record?</p>
          <p className="mt-2 text-sm leading-6 text-white/50">Use the booking or tracking ID shown on your document.</p>
          <a href="/#contact" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-300 px-4 py-2.5 text-sm font-semibold text-[#041225]"><Plane className="size-4" /> Contact flight support</a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/35">© {new Date().getFullYear()} MyFlightLookup. Flight information is supplied by the record owner.</p>
    </footer>
  );
}
