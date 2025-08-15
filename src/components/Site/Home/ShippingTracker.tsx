import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaCheckCircle, FaLock, FaExclamationTriangle } from "react-icons/fa";

export const TrackingComponent: React.FC = () => {
  return (
    <section className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 p-0 shadow-none font-sans relative">
      {/* Header & Status */}
      <header className="flex items-center border-b border-slate-200 px-6 py-5 bg-slate-50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-emerald-500 text-2xl" />
          <h1 className="text-xl font-extrabold tracking-wide text-indigo-900">Check In</h1>
          <span className="ml-3 text-slate-500 text-base font-semibold">21 Jul 2025</span>
        </div>
      </header>
      {/* Route */}
      <div className="flex items-center justify-center gap-6 px-6 pt-8 pb-3 select-none">
        <span className="flex items-center gap-2 text-blue-700 font-bold text-lg drop-shadow">
          <FaPlaneDeparture />
          Sydney Australia (SYD)
        </span>
        <span className="text-2xl text-slate-400 font-bold">→</span>
        <span className="flex items-center gap-2 text-blue-700 font-bold text-lg drop-shadow">
          <FaPlaneArrival />
          Lima Peru (LIM)
        </span>
      </div>
      {/* Details Table - Unique grid layout */}
      <div className="px-6 pt-4 pb-2">
        <dl className="grid grid-cols-2 gap-y-5 gap-x-4">
          <dt className="text-slate-500 font-medium text-right">Passenger:</dt>
          <dd className="text-indigo-900 font-semibold text-left">John Jojo</dd>
          <dt className="text-slate-500 font-medium text-right">Booking Reference:</dt>
          <dd className="text-indigo-900 font-semibold text-left break-words">THW7V6KADUPOIPYEADPX</dd>
          <dt className="text-slate-500 font-medium text-right">Booking Status:</dt>
          <dd className="text-indigo-900 font-semibold text-left">OK</dd>
          <dt className="text-slate-500 font-medium text-right">Booking Date:</dt>
          <dd className="text-indigo-900 font-semibold text-left">20 Jul 2025</dd>
          <dt className="text-slate-500 font-medium text-right">Web check-in status:</dt>
          <dd className="text-emerald-600 font-bold flex items-center gap-2 text-left">
            CHECKED IN <FaLock className="inline-block" />
          </dd>
        </dl>
      </div>
      {/* Warning Notice - Unique Banner */}
      <div className="flex items-center gap-2 text-red-600 bg-gradient-to-r from-red-50 via-white to-red-50 rounded-md px-6 py-3 text-base font-semibold border-t border-b border-red-200 mx-6 mt-2 mb-5 shadow-inner">
        <FaExclamationTriangle className="text-xl" />
        <span>
          This is a test flight booking. <span className="underline decoration-dotted decoration-red-500">Remove watermark to remove warning.</span>
        </span>
      </div>
    </section>
  );
};