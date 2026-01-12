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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-primary/20 mx-auto" />
            <Plane className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-fancy font-bold tracking-tight text-foreground">Locating Flight</h2>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">ID: {trackingId}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (trackOrderQuery.isError) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-red-100 shadow-2xl shadow-red-500/5 overflow-hidden"
        >
          <div className="p-10 text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-fancy font-extrabold text-red-600">Flight Not Found</h1>
              <p className="text-muted-foreground leading-relaxed">
                The booking reference <span className="font-bold text-foreground">"{trackingId}"</span> does not match any records in our global database.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </button>
              <button
                onClick={() => trackOrderQuery.refetch()}
                className="px-8 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-shadow shadow-lg shadow-red-600/20"
              >
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 mb-20 font-sans">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -2 }}
        className="group flex items-center gap-2 text-sm font-bold text-muted-foreground mb-8 hover:text-primary transition-colors"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        BACK TO TRACKER
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Main Tracking Card */}
        <Card className="border-none bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-0">
            {/* Header / Status Banner */}
            <div className="bg-primary px-8 py-6 flex items-center justify-between font-fancy">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-white tracking-wide uppercase">Track Status</h1>
                  <p className="text-xs font-bold text-white/60 tracking-widest leading-none mt-1 uppercase">Validating Data</p>
                </div>
              </div>
              <Badge className="bg-white text-primary hover:bg-white px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase border-none">
                Checked In
              </Badge>
            </div>

            <div className="p-8 sm:p-12 space-y-12">
              {/* Route Display */}
              {(() => {
                const origin = getFieldDisplayValue(getFieldByRole("origin1"));
                const destination = getFieldDisplayValue(getFieldByRole("destination1"));

                if (!origin || !destination) return null;

                return (
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
                      <div className="text-center sm:text-left min-w-[140px]">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Departure</p>
                        <PlaneTakeoff className="w-6 h-6 text-primary mb-3 mx-auto sm:mx-0" />
                        <h2 className="text-2xl font-fancy font-black text-foreground uppercase tracking-tight leading-tight">{origin}</h2>
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center relative px-10">
                        <div className="w-full h-[2px] bg-slate-100 absolute top-1/2 -translate-y-1/2" />
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          className="relative z-10 bg-white p-3 rounded-full border border-slate-100 shadow-sm"
                        >
                          <Plane className="w-6 h-6 text-primary rotate-90" />
                        </motion.div>
                        <p className="absolute -bottom-6 text-[9px] font-black text-slate-300 uppercase tracking-widest">In Transit</p>
                      </div>

                      <div className="text-center sm:text-right min-w-[140px]">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Arrival</p>
                        <PlaneLanding className="w-6 h-6 text-primary mb-3 mx-auto sm:ml-auto" />
                        <h2 className="text-2xl font-fancy font-black text-foreground uppercase tracking-tight leading-tight">{destination}</h2>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 group/grid">
                {/* Information Sections */}
                {[
                  { icon: User, label: "Passenger Name", field: "name" },
                  { icon: Hash, label: "Flight Number", field: "flight" },
                  { icon: Shield, label: "Booking Status", field: "status", isStatus: true },
                  { icon: Calendar, label: "Booking Date", field: "date" },
                ].map((item, idx) => {
                  const val = getFieldDisplayValue(getFieldByRole(item.field));
                  if (!val) return null;

                  return (
                    <div key={idx} className="space-y-2 relative">
                      <div className="flex items-center gap-2 mb-3 font-fancy">
                        <item.icon className="w-3.5 h-3.5 text-primary/60" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{item.label}</span>
                      </div>
                      {item.isStatus ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-fancy font-black text-lg uppercase tracking-tight">
                          {val}
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                      ) : (
                        <p className="text-xl font-fancy font-black text-foreground uppercase tracking-tight">{val}</p>
                      )}
                    </div>
                  );
                })}

                <div className="space-y-2 h-full">
                  <div className="flex items-center gap-2 mb-3 font-fancy">
                    <Hash className="w-3.5 h-3.5 text-primary/60" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Reference ID</span>
                  </div>
                  <p className="text-xl font-fancy font-black text-foreground uppercase tracking-tight break-all">{trackingId}</p>
                </div>
              </div>

              {trackOrderQuery.data?.test && (
                <Alert className="border-none bg-red-50/50 rounded-3xl p-6 ring-1 ring-red-100 flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-2xl">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-red-900 font-fancy font-black tracking-tight text-lg mb-1">Testing Environment</h4>
                    <AlertDescription className="text-red-700 font-medium text-sm leading-relaxed">
                      This results data is simulated for demonstration purposes.
                      <span className="block mt-1 font-bold underline decoration-dotted underline-offset-4">
                        Remove watermarks to enable live production flight data.
                      </span>
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer / Info */}
        <div className="text-center px-10">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Global Flight Information Systems © 2025</p>
        </div>
      </motion.div>
    </div>
  );
};
