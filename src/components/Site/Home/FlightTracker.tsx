import type React from "react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Plane,
  Activity,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { trackOrder } from "@/api/apiEndpoints";
import useToolStore from "@/store/toolStore";
import { useQuery } from "@tanstack/react-query";

export const FlightTracker: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSvgRaw, setFields, setStatus, setStatusMessage, fields, resetForm } = useToolStore();

  const trackingId = searchParams.get("trackingId") || "";

  const trackOrderQuery = useQuery({
    queryKey: ['trackOrder', trackingId],
    queryFn: () => trackOrder(trackingId),
    enabled: !!trackingId,
    retry: 1
  });

  useEffect(() => {
    if (trackingId) {
      resetForm();
      setSvgRaw("");
      setStatus("");
      setStatusMessage("");
    }
  }, [trackingId, resetForm, setSvgRaw, setStatus, setStatusMessage]);

  useEffect(() => {
    if (trackOrderQuery.data) {
      console.log("BACKEND DATA PAYLOAD:", trackOrderQuery.data);
      setSvgRaw(trackOrderQuery.data.svg);
      setFields(trackOrderQuery.data.form_fields);
      setStatus(trackOrderQuery.data.status);
      if (trackOrderQuery.data.error_message) {
        setStatusMessage(trackOrderQuery.data.error_message);
      }
    }
  }, [trackOrderQuery.data, setSvgRaw, setFields, setStatus, setStatusMessage]);

  const getFieldByRole = (role: string) => {
    return fields.find(field => {
      if (!field.trackingRole) return false;
      // Many roles are now prefixed with 'track_' for backend exposure. Match both.
      return field.trackingRole === role || field.trackingRole === `track_${role}`;
    });
  };

  const getFieldDisplayValue = (field: any): string | number | boolean | undefined => {
    if (!field) return undefined;
    const rawValue = field.currentValue ?? field.defaultValue;
    if (rawValue === undefined || rawValue === null) return undefined;

    if (Array.isArray(field.options) && field.options.length > 0) {
      const rawStr = String(rawValue);
      const match = field.options.find((opt: any) => opt.svgElementId === rawStr || String(opt.value) === rawStr);
      if (match) return match.label ?? match.displayText ?? match.value;
    }
    return rawValue;
  };

  if (trackOrderQuery.isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-slate-50/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            <Plane className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Locating Shipment</h2>
            <p className="text-slate-400 text-[10px] font-medium tracking-[0.2em] uppercase max-w-[200px] truncate mx-auto">{trackingId}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (trackOrderQuery.isError) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 text-center space-y-6"
        >
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto ring-4 ring-red-50/50">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold text-slate-900">Tracking Not Found</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              We couldn't find any records for <span className="font-mono font-medium text-slate-700 bg-slate-100 px-1 py-0.5 rounded text-xs">{trackingId}</span>.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Track Another
          </button>
        </motion.div>
      </div>
    );
  }





  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 font-inter bg-gray-100">
      {/* Navigation */}
      <div className="flex justify-start mb-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -2 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-slate-500 text-xs font-medium hover:text-indigo-600 hover:bg-indigo-50 transition-all group"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 text-white shadow-sm backdrop-blur-sm">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white font-outfit tracking-tight">Tracking Details</h1>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-1">
                  ID: <span className="font-mono text-slate-300">{trackingId}</span>
                </p>
              </div>
            </div>
            {getFieldByRole("status") && (
              <Badge variant="secondary" className="bg-white/10 text-slate-200 border-white/10 px-3 py-1.5 rounded-lg font-bold text-[10px] tracking-wider uppercase border shadow-sm backdrop-blur-sm">
                {String(getFieldDisplayValue(getFieldByRole("status")) || "Unknown")}
              </Badge>
            )}
          </div>

          <div className="p-6 sm:p-10 space-y-10">

            {/* Route */}
            {/* Multi-Leg Routes */}
            <div className="space-y-6">
              {[1, 2, 3].map((leg) => {
                const origin = getFieldDisplayValue(getFieldByRole(`origin${leg}`));
                const destination = getFieldDisplayValue(getFieldByRole(`destination${leg}`));
                // Display specific time for leg 1, or generally if just "departure_time" exists
                const timeDep = leg === 1 ? getFieldDisplayValue(getFieldByRole("departure_time")) : null;
                const dateDep = leg === 1 ? getFieldDisplayValue(getFieldByRole("departure_date")) : null;
                const timeArr = leg === 1 ? getFieldDisplayValue(getFieldByRole("arrival_time")) : null;
                const dateArr = leg === 1 ? getFieldDisplayValue(getFieldByRole("arrival_date")) : null;
                const flight = getFieldDisplayValue(getFieldByRole("flight"));

                if (!origin || !destination) return null;

                const renderDateTime = (date: any, time: any) => {
                  if (!date && !time) return null;
                  if (date && time) return `${date} • ${time}`;
                  return date || time;
                };

                return (
                  <div key={leg} className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 border border-white/10 relative overflow-hidden shadow-lg shadow-slate-900/20">
                    {/* Leg Label */}
                    <div className="absolute top-0 right-0 px-3 py-1 bg-white/10 text-[10px] font-bold text-slate-300 uppercase rounded-bl-xl tracking-wider backdrop-blur-sm border-l border-b border-white/5">
                      Leg {leg}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
                      <div className="text-center md:text-left space-y-1 min-w-[120px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-outfit">Origin</p>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-outfit uppercase">{origin}</h2>
                        {(timeDep || dateDep) && (
                          <div className="text-sm font-medium text-slate-300 mt-1">
                            {renderDateTime(dateDep, timeDep)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full flex flex-col items-center gap-2">
                        <div className="relative w-full max-w-[200px]">
                          <div className="w-full h-[2px] bg-indigo-500/30 relative rounded-full overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/0 via-indigo-400 to-white/0 w-1/2 animate-[shimmer_2s_infinite]"></div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-1.5 rounded-full border border-indigo-500/30">
                            <Plane className="w-4 h-4 text-indigo-400 transform rotate-90" />
                          </div>
                        </div>
                        <div className="px-2 py-0.5 rounded text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                          {flight || "In Transit"}
                        </div>
                      </div>

                      <div className="text-center md:text-right space-y-1 min-w-[120px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-outfit">Destination</p>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-outfit uppercase">{destination}</h2>
                        {(timeArr || dateArr) && (
                          <div className="text-sm font-medium text-slate-300 mt-1">
                            {renderDateTime(dateArr, timeArr)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fields List */}
            <div className="flex flex-col border-t border-slate-200 mt-6">
              {[
                { role: "name", label: "Passenger Name", colSpan: "col-span-2 md:col-span-1" },
                { role: "date", label: "Booking Date", colSpan: "col-span-2 md:col-span-1" },
                { role: "airline", label: "Airline", colSpan: "col-span-2 md:col-span-1" },
                { role: "flight", label: "Flight Number", colSpan: "col-span-2 md:col-span-1" },
                { role: "departure_date", label: "Departure Date", colSpan: "col-span-2 md:col-span-1" },
                { role: "departure_time", label: "Departure Time", colSpan: "col-span-2 md:col-span-1" },
                { role: "arrival_date", label: "Arrival Date", colSpan: "col-span-2 md:col-span-1" },
                { role: "arrival_time", label: "Arrival Time", colSpan: "col-span-2 md:col-span-1" },
                { role: "gate", label: "Gate", colSpan: "col-span-1" },
                { role: "seat", label: "Seat", colSpan: "col-span-1" },
                { role: "class", label: "Class", colSpan: "col-span-2 md:col-span-1" },
                { role: "email", label: "Email", colSpan: "col-span-2" },
              ].map(item => {
                const field = getFieldByRole(item.role);
                if (!field) return null;
                const value = getFieldDisplayValue(field);
                if (!value) return null;

                return (
                  <div key={item.role} className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0 hover:bg-slate-50/50 transition-colors px-2 gap-4">
                    <div className="flex items-center text-slate-500">
                      <span className="text-[11px] font-bold uppercase tracking-widest font-outfit">{item.label}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm break-words text-right">
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>



            {trackOrderQuery.data?.test && (
              <div className="mt-4 flex items-center gap-3 px-4 py-4 rounded-lg bg-amber-50 border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-sm font-bold text-amber-800">
                  This is a demonstration tracking page. Data shown is for testing purposes.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] font-semibold text-slate-300 uppercase tracking-[0.3em] font-outfit hover:text-slate-400 transition-colors cursor-default">
          Secure Logistics Tracking
        </p>
      </motion.div>
    </div>
  );
};
