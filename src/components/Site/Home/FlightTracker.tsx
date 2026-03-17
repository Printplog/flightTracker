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

  // EXTRACT DYNAMIC ITINERARY (LEG-BASED)
  const getItinerary = () => {
    const legs: any[] = [];
    let i = 1;
    while (true) {
      const origin = getFieldDisplayValue(getFieldByRole(`origin${i}`));
      const destination = getFieldDisplayValue(getFieldByRole(`destination${i}`));

      if (!origin && !destination) break;

      // Get datetime fields (combined date+time in one field)
      const departureDatetime = String(getFieldDisplayValue(getFieldByRole(`origin${i}_departure_datetime`)) || getFieldDisplayValue(getFieldByRole(`origin${i}_departure_date`)) || '');
      const arrivalDatetime = String(getFieldDisplayValue(getFieldByRole(`destination${i}_arrival_datetime`)) || getFieldDisplayValue(getFieldByRole(`destination${i}_arrival_date`)) || '');

      // Try to separate date and time if they're combined (e.g., "1 Sep 2024, 14:10pm")
      const parseDatetime = (datetimeStr: string | undefined | null) => {
        if (!datetimeStr) return { date: '', time: '' };
        const str = String(datetimeStr);
        // Check for pattern like "1 Sep 2024, 14:10pm" or "Jan 10, 2024 14:30"
        const match = str.match(/^(.+?),\s*(.+)$/);
        if (match) {
          return { date: match[1].trim(), time: match[2].trim() };
        }
        // If no comma, return full string as date
        return { date: str, time: '' };
      };

      const departureParsed = parseDatetime(departureDatetime);
      const arrivalParsed = parseDatetime(arrivalDatetime);

      const depDate = departureParsed.date || String(getFieldDisplayValue(getFieldByRole("departure_date")) || '');
      const depTime = departureParsed.time || String(getFieldDisplayValue(getFieldByRole("departure_time")) || '');
      const arrDate = arrivalParsed.date || String(getFieldDisplayValue(getFieldByRole("arrival_date")) || '');
      const arrTime = arrivalParsed.time || String(getFieldDisplayValue(getFieldByRole("arrival_time")) || '');

      legs.push({
        index: i,
        origin,
        destination,
        departureDate: depDate,
        departureTime: depTime,
        arrivalDate: arrDate,
        arrivalTime: arrTime,
        flight: getFieldDisplayValue(getFieldByRole(`flight${i}`)) || getFieldDisplayValue(getFieldByRole("flight"))
      });
      i++;
    }
    return legs;
  };

  const itinerary = getItinerary();

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

  const renderDisplayValue = (val: any) => {
    if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('data:image/'))) {
      return <img src={val} alt="display value" className="max-h-12 w-auto object-contain inline-block rounded-md" />;
    }
    return val;
  };

  return (
    <>
      {/* Full page background */}
      <div className="fixed inset-0 bg-slate-100 -z-10"></div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 sm:p-6 pb-20">
        {/* Navigation - Back button as circle with arrow */}
        <div className="flex justify-start mb-6">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:shadow-xl hover:border-indigo-400 transition-all"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border-2 border-slate-300 overflow-hidden">
            {/* Header - Compact & Clean */}
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 tracking-tight">Tracking Details</h1>
                  <p className="text-[9px] font-medium text-slate-500 uppercase tracking-wide leading-none mt-0.5">
                    <span className="font-mono text-slate-700">{trackingId}</span>
                  </p>
                </div>
              </div>
              {getFieldByRole("status") && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 px-2.5 py-1 rounded-md font-bold text-[9px] uppercase border">
                  {String(getFieldDisplayValue(getFieldByRole("status")) || "CONFIRMED")}
                </Badge>
              )}
            </div>

            <div className="p-5 sm:p-6 space-y-6">

              {/* Main Segment Card (Leg 1) - Compact */}
              {itinerary.length > 0 && (
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 border border-white/10 relative overflow-hidden shadow-lg shadow-indigo-950/20">
                  {/* Leg Label */}
                  <div className="absolute top-0 right-0 px-3 py-1 bg-white/10 text-[9px] font-bold text-slate-200 uppercase rounded-bl-xl tracking-wide backdrop-blur-md border-l border-b border-white/10">
                    Leg 1
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-3 relative z-10">
                    <div className="text-center md:text-left space-y-1 min-w-[120px]">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Origin</p>
                      <h2 className="text-lg font-bold text-white tracking-tight leading-tight">
                        {itinerary[0].origin}
                      </h2>
                      {itinerary[0].departureTime && (
                        <p className="text-xs font-bold text-indigo-300 font-mono">
                          {itinerary[0].departureTime}
                        </p>
                      )}
                    </div>

                    <div className="flex-1 w-full flex flex-col items-center gap-3">
                      <div className="relative w-full max-w-[200px]">
                        <div className="w-full h-[2px] bg-white/10 relative rounded-full overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent w-full animate-[shimmer_3s_infinite]"></div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 p-2 rounded-full border border-indigo-500/50 shadow-xl shadow-indigo-500/20">
                          <Plane className="w-4 h-4 text-indigo-400 transform rotate-90" />
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-indigo-200 uppercase tracking-wide flex items-center justify-center backdrop-blur-sm">
                        {itinerary[0].flight || "In Transit"}
                      </div>
                    </div>

                    <div className="text-center md:text-right space-y-1 min-w-[120px]">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">Destination</p>
                      <h2 className="text-lg font-bold text-white tracking-tight leading-tight">
                        {itinerary[0].destination}
                      </h2>
                      {itinerary[0].arrivalTime && (
                        <p className="text-xs font-bold text-indigo-300 font-mono">
                          {itinerary[0].arrivalTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl"></div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>
              )}

              {/* Data Fields Table */}
              <div className="space-y-1">
                {[
                  { role: "name", label: "Passenger Name" },
                  { role: "date", label: "Booking Date" },
                  { role: "booking_reference", label: "Booking Reference" },
                  { role: "flight", label: "Flight Number" },
                  { role: "email", label: "Email" },
                ].map((item, idx) => {
                  const field = getFieldByRole(item.role === 'booking_reference' ? 'tracking_id' : item.role);
                  let value = getFieldDisplayValue(field);
                  if (item.role === 'booking_reference' && !value) value = trackingId;
                  if (!value) return null;

                  return (
                    <div key={idx} className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors px-2 gap-4 group">
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">{item.label}</span>
                      <span className="font-extrabold text-slate-900 text-sm text-right uppercase tracking-tight">{renderDisplayValue(value)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Itinerary List - Compact Design */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Itinerary</div>

                {itinerary.map((leg, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    {/* Compact Leg Card */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      {/* Leg Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Leg {idx + 1}</span>
                        {leg.flight && (
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                            {leg.flight}
                          </span>
                        )}
                      </div>

                      {/* Departure & Arrival Row */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Departure */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">From</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{leg.origin}</p>
                          <p className="text-xs text-slate-500 font-medium">{leg.departureDate || "---"}</p>
                          <p className="text-sm font-bold text-slate-700 font-mono">{leg.departureTime || "--:--"}</p>
                        </div>

                        {/* Arrival */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">To</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{leg.destination}</p>
                          <p className="text-xs text-slate-500 font-medium">{leg.arrivalDate || "---"}</p>
                          <p className="text-sm font-bold text-slate-700 font-mono">{leg.arrivalTime || "--:--"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

          <p className="text-center text-[10px] font-semibold text-slate-300 uppercase tracking-[0.3em] hover:text-slate-400 transition-colors cursor-default">
            Secure Logistics Tracking
          </p>
        </motion.div>
      </div>
    </>
  );
};
