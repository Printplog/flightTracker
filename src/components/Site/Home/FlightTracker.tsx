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

      legs.push({
        index: i,
        origin,
        destination,
        departureDate: getFieldDisplayValue(getFieldByRole(`origin${i}_departure_date`)) || getFieldDisplayValue(getFieldByRole("departure_date")),
        departureTime: getFieldDisplayValue(getFieldByRole(`origin${i}_departure_time`)) || getFieldDisplayValue(getFieldByRole("departure_time")),
        arrivalDate: getFieldDisplayValue(getFieldByRole(`destination${i}_arrival_date`)) || getFieldDisplayValue(getFieldByRole("arrival_date")),
        arrivalTime: getFieldDisplayValue(getFieldByRole(`destination${i}_arrival_time`)) || getFieldDisplayValue(getFieldByRole("arrival_time")),
        flight: getFieldDisplayValue(getFieldByRole(`flight${i}`)) || getFieldDisplayValue(getFieldByRole("flight"))
      });
      i++;
    }
    return legs;
  };

  const itinerary = getItinerary();

  const getFlightType = () => {
    const explicitType = getFieldDisplayValue(getFieldByRole("flight_type"));
    if (explicitType) return String(explicitType).toUpperCase();

    if (itinerary.length === 0) return "FLIGHT TRACKER";
    
    const firstOrigin = String(itinerary[0].origin || "").toLowerCase().trim();
    const lastDestination = String(itinerary[itinerary.length - 1].destination || "").toLowerCase().trim();

    if (itinerary.length > 1 && firstOrigin === lastDestination && firstOrigin !== "") {
      return "RETURN FLIGHT";
    }
    
    if (itinerary.length > 1) return "STOP OVER FLIGHT";
    
    return "ONE WAY FLIGHT";
  };

  const flightType = getFlightType();

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
    <div className="max-w-2xl mx-auto p-4 sm:p-6 font-inter bg-gray-100 pb-20">
      {/* Flight Type Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-red-500 uppercase tracking-tighter italic">
          {flightType}
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex justify-start mb-6">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -2 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-slate-500 text-xs font-semibold hover:text-indigo-600 hover:bg-indigo-50 transition-all group"
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
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-white shadow-inner backdrop-blur-md">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-white font-outfit tracking-tight">Tracking Details</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1.5">
                  ID: <span className="font-mono text-indigo-300">{trackingId}</span>
                </p>
              </div>
            </div>
            {getFieldByRole("status") && (
              <Badge variant="secondary" className="bg-white/10 text-slate-100 border-white/10 px-4 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase border shadow-lg backdrop-blur-md">
                {String(getFieldDisplayValue(getFieldByRole("status")) || "CONFIRMED")}
              </Badge>
            )}
          </div>

          <div className="p-6 sm:p-10 space-y-12">

            {/* Main Segment Card (Leg 1) */}
            {itinerary.length > 0 && (
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-white/10 relative overflow-hidden shadow-2xl shadow-indigo-950/20 group">
                {/* Leg Label */}
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-white/10 text-[10px] font-black text-slate-200 uppercase rounded-bl-2xl tracking-widest backdrop-blur-md border-l border-b border-white/10">
                  LEG 1
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-4 relative z-10">
                  <div className="text-center md:text-left space-y-2 min-w-[140px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-outfit opacity-80">Origin</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter font-outfit uppercase leading-tight">
                      {itinerary[0].origin}
                    </h2>
                    {itinerary[0].departureTime && (
                      <p className="text-sm font-bold text-indigo-300 font-mono tracking-tight">
                        {itinerary[0].departureTime}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 w-full flex flex-col items-center gap-4">
                    <div className="relative w-full max-w-[240px]">
                      <div className="w-full h-[3px] bg-white/10 relative rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent w-full animate-[shimmer_3s_infinite]"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 p-2.5 rounded-full border border-indigo-500/50 shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                        <Plane className="w-5 h-5 text-indigo-400 transform rotate-90" />
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] flex items-center justify-center backdrop-blur-sm">
                      {itinerary[0].flight || "IN TRANSIT"}
                    </div>
                  </div>

                  <div className="text-center md:text-right space-y-2 min-w-[140px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-outfit opacity-80">Destination</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter font-outfit uppercase leading-tight">
                      {itinerary[0].destination}
                    </h2>
                    {itinerary[0].arrivalTime && (
                      <p className="text-sm font-bold text-indigo-300 font-mono tracking-tight">
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

            {/* Itinerary List */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
               <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Itinerary Segments</div>
               
               {itinerary.map((leg, idx) => (
                 <div key={idx} className="space-y-8 mb-12 last:mb-0">
                    {/* Departure Segment */}
                    <div className="flex justify-between items-start group">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">DEPARTURE</p>
                        <h3 className="text-2xl font-black text-slate-900 uppercase font-outfit tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">
                          {leg.origin}
                        </h3>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-tight">{leg.departureDate || "---"}</p>
                        <p className="text-2xl font-black text-slate-900 font-mono tabular-nums leading-none italic">{leg.departureTime || "--:--"}</p>
                      </div>
                    </div>

                    {/* Arrival Segment */}
                    <div className="flex justify-between items-start group">
                      <div className="space-y-2 pl-4 border-l-2 border-slate-100">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">ARRIVAL</p>
                        <h3 className="text-2xl font-black text-slate-900 uppercase font-outfit tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                          {leg.destination}
                        </h3>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-tight">{leg.arrivalDate || "---"}</p>
                        <p className="text-2xl font-black text-slate-900 font-mono tabular-nums leading-none italic">{leg.arrivalTime || "--:--"}</p>
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

        <p className="text-center text-[10px] font-semibold text-slate-300 uppercase tracking-[0.3em] font-outfit hover:text-slate-400 transition-colors cursor-default">
          Secure Logistics Tracking
        </p>
      </motion.div>
    </div>
  );
};
