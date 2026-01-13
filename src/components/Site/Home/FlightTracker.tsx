import type React from "react";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  User,
  Loader2,
  Plane,
  Calendar,
  Hash,
  Activity,
  ArrowLeft,
  CheckCircle,
  Clock,
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
      setSvgRaw(trackOrderQuery.data.svg);
      setFields(trackOrderQuery.data.form_fields);
      setStatus(trackOrderQuery.data.status);
      if (trackOrderQuery.data.error_message) {
        setStatusMessage(trackOrderQuery.data.error_message);
      }
    }
  }, [trackOrderQuery.data, setSvgRaw, setFields, setStatus, setStatusMessage]);

  const getFieldByRole = (role: string) => {
    return fields.find(field => field.trackingRole === role);
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 mt-16 font-inter">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative w-16 h-16 mx-auto">
            <Loader2 className="w-full h-full animate-spin text-primary/30" />
            <Plane className="w-6 h-6 text-primary absolute inset-0 m-auto" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Locating Flight</h2>
            <p className="text-muted-foreground text-[10px] font-medium tracking-[0.2em] uppercase">{trackingId}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (trackOrderQuery.isError) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-20 font-inter">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-6"
        >
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900 font-outfit">Booking Not Found</h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              No records found for <span className="font-semibold text-foreground">"{trackingId}"</span>. Please verify your ID.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 mb-20 font-inter">
      {/* Refined Back Button */}
      <div className="flex justify-start mb-10">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -2 }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-lg text-slate-500 text-sm font-medium hover:text-slate-900 hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Track another flight
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="border border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Minimal Header */}
            <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-tight">Status Update</h1>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-0.5">Live GIS Data</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-md font-bold text-[9px] tracking-wider uppercase border border-emerald-100/50">
                Confirmed
              </Badge>
            </div>

            <div className="p-8 sm:p-12 space-y-12">
              {/* Simplified Route Display with CAPS and Lighter Font */}
              {(() => {
                const origin = getFieldDisplayValue(getFieldByRole("origin1"));
                const destination = getFieldDisplayValue(getFieldByRole("destination1"));

                if (!origin || !destination) return null;

                return (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-outfit">Origin</p>
                      <h2 className="text-2xl font-semibold text-slate-900 tracking-tight font-outfit uppercase">{origin}</h2>
                    </div>

                    <div className="flex-1 w-full max-w-[180px] flex flex-col items-center gap-3">
                      <div className="w-full h-px bg-slate-100 relative">
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 left-0"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        >
                          <Plane className="w-3.5 h-3.5 text-primary/40 rotate-90 -translate-x-1/2" />
                        </motion.div>
                      </div>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">Non-stop</span>
                    </div>

                    <div className="text-center md:text-right space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-outfit">Destination</p>
                      <h2 className="text-2xl font-semibold text-slate-900 tracking-tight font-outfit uppercase">{destination}</h2>
                    </div>
                  </div>
                );
              })()}

              {/* Individual Bordered Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { label: "Passenger", field: "name", icon: User },
                  { label: "Flight No", field: "flight", icon: Hash },
                  { label: "Date", field: "date", icon: Calendar },
                  { label: "Reference", value: trackingId, icon: Shield },
                ].map((item, idx) => {
                  const val = item.value || getFieldDisplayValue(getFieldByRole(item.field || ""));
                  if (!val) return null;

                  return (
                    <div key={idx} className="p-4 border border-slate-100 rounded-xl bg-slate-50/20 hover:bg-slate-50 transition-colors space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <item.icon className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-outfit">{item.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700 leading-tight truncate">{val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Ultra-Clean Status Footer */}
              <div className="pt-8 border-t border-slate-50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-50/50 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Boarding Status</p>
                      <h3 className="text-lg font-bold text-slate-900 font-outfit">Checked In & Ready</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-primary/50" />
                    Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {trackOrderQuery.data?.test && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-50/50 border border-amber-100/50">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <p className="text-[11px] text-amber-700 font-medium">
                    Simulated demonstration data. <span className="underline decoration-amber-200 cursor-help">Remove watermarks</span> for live tracking.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-[10px] font-medium text-slate-300 uppercase tracking-[0.4em]">Integrated Flight Systems</p>
      </motion.div>
    </div>
  );
};
