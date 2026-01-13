import type React from "react";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  User,
  Loader2,
  PlaneTakeoff,
  PlaneLanding,
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 bg-white p-10 rounded-2xl border border-slate-100"
        >
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <Plane className="w-8 h-8 text-primary absolute inset-0 m-auto" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-fancy font-bold tracking-tight text-foreground">Locating Flight Record</h2>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">ID: {trackingId}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (trackOrderQuery.isError) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[1.5rem] border border-red-200 overflow-hidden"
        >
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-fancy font-extrabold text-red-600">Booking Not Found</h1>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                We couldn't locate any flight records matching <span className="font-bold text-foreground">"{trackingId}"</span>. Please check the reference ID and try again.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-colors text-sm border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 mb-20 font-sans">
      <div className="flex justify-start mb-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-bold shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Tracker
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="border border-slate-200 bg-white shadow-sm rounded-[1.5rem] overflow-hidden">
          <CardContent className="p-0">
            {/* Clean Header */}
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-fancy font-black text-slate-900 uppercase tracking-tight">Live Status</h1>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Real-time Data</p>
                  </div>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1.5 rounded-lg font-black text-[10px] tracking-widest uppercase border border-emerald-200 shadow-none">
                Checked In
              </Badge>
            </div>

            <div className="p-8 sm:p-10 space-y-10">
              {/* Route Display - Simplified */}
              {(() => {
                const origin = getFieldDisplayValue(getFieldByRole("origin1"));
                const destination = getFieldDisplayValue(getFieldByRole("destination1"));

                if (!origin || !destination) return null;

                return (
                  <div className="pb-10 border-b border-slate-100 border-dashed">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                          <PlaneTakeoff className="w-3 h-3" /> Departure
                        </div>
                        <h2 className="text-4xl font-fancy font-black text-slate-900 tracking-tighter">{origin}</h2>
                      </div>

                      <div className="flex-1 w-full max-w-xs flex flex-col items-center gap-2">
                        <div className="w-full h-px bg-slate-200 relative overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 w-1/3 bg-primary/20"
                            animate={{ x: ["-100%", "300%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          />
                        </div>
                        <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Flight</p>
                        </div>
                      </div>

                      <div className="text-center md:text-right">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                          <PlaneLanding className="w-3 h-3" /> Arrival
                        </div>
                        <h2 className="text-4xl font-fancy font-black text-slate-900 tracking-tighter">{destination}</h2>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Information Grid - Card Based */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: User, label: "Passenger", field: "name", color: "text-blue-500", bg: "bg-blue-50" },
                  { icon: Hash, label: "Flight No.", field: "flight", color: "text-violet-500", bg: "bg-violet-50" },
                  { icon: Calendar, label: "Date", field: "date", color: "text-orange-500", bg: "bg-orange-50" },
                  { icon: Shield, label: "Ref ID", value: trackingId, color: "text-slate-500", bg: "bg-slate-100" }, // Using value directly for ID
                ].map((item, idx) => {
                  const val = item.value || getFieldDisplayValue(getFieldByRole(item.field || ""));
                  if (!val) return null;

                  return (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg} ${item.color}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-base font-bold text-slate-900 font-fancy leading-tight break-words">{val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Status Section */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Current Status</p>
                    <h3 className="text-2xl font-fancy font-black tracking-tight text-white">Confirmed</h3>
                  </div>
                </div>
                <div className="h-px w-full sm:w-px sm:h-12 bg-white/10" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white/80">Flight Scheduled</span>
                </div>
              </div>

              {trackOrderQuery.data?.test && (
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 font-medium">
                    <span className="font-bold text-amber-800 block mb-0.5">Test Environment</span>
                    Tracking results are simulated. Remove watermarks to enable live data.
                  </p>
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <Clock className="w-3 h-3" />
                Last Updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
