import type React from "react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Shield,
  AlertTriangle,
  User,
  Loader2,
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

  // Get tracking ID from URL params or use default
  const trackingId = searchParams.get("trackingId") || "";

  // Query for tracking order
  const trackOrderQuery = useQuery({
    queryKey: ['trackOrder', trackingId],
    queryFn: () => {
      console.log("Tracking order with ID:", trackingId);
      return trackOrder(trackingId);
    },
    enabled: !!trackingId, // Only run if trackingId exists
    retry: 1
  });

  // Effect to handle data storage and clearing
  useEffect(() => {
    if (trackingId) {
      // Clear store data when trackingId changes
      resetForm();
      setSvgRaw("");
      setStatus("");
      setStatusMessage("");
    }
  }, [trackingId, resetForm, setSvgRaw, setStatus, setStatusMessage]);

  // Effect to handle successful data
  useEffect(() => {
    if (trackOrderQuery.data) {
      console.log("Track order response:", trackOrderQuery.data);
      
      // Store the SVG and form fields in the store
      setSvgRaw(trackOrderQuery.data.svg);
      setFields(trackOrderQuery.data.form_fields);
      setStatus(trackOrderQuery.data.status);

      if (trackOrderQuery.data.error_message) {
        setStatusMessage(trackOrderQuery.data.error_message);
      }
    }
  }, [trackOrderQuery.data, setSvgRaw, setFields, setStatus, setStatusMessage]);

  // Helper function to find field strictly by tracking role
  const getFieldByRole = (role: string) => {
    return fields.find(field => field.trackingRole === role);
  };

  // Loading state
  if (trackOrderQuery.isPending) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="max-w-2xl mx-auto p-4"
      >
        <button
          className="text-sm text- border rounded-sm hover:bg-gray-50 px-5 py-2 mb-4"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <Card className="overflow-hidden shadow-lg py-0">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg font-semibold">Looking up flight...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Tracking ID: {trackingId}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Error state
  if (trackOrderQuery.isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="max-w-2xl mx-auto p-4"
      >
        <button
          className="text-sm text- border rounded-sm hover:bg-gray-50 px-5 py-2 mb-4"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <Card className="overflow-hidden shadow-lg py-0">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
            <p className="text-lg font-semibold text-red-600">Flight Not Found</p>
            <p className="text-sm text-muted-foreground mt-2">
              A flight with ID "{trackingId}" was not found
            </p>
            <button
              className="mt-4 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
              onClick={() => trackOrderQuery.refetch()}
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="max-w-2xl mx-auto p-4"
    >
      <button
        className="text-sm text- border rounded-sm hover:bg-gray-50 px-5 py-2 mb-4"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <Card className="overflow-hidden shadow-lg py-0">
        <CardHeader className="bg-primary text-white py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Lookup Complete
                </h1>
                <p className="text-sm text-white/80">
                  Flight details found
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Flight Details */}
          {(() => {
            // Use tracking roles only (data provided by SVG roles)
            const flightDepartureField = getFieldByRole("origin1");
            const flightArrivalField = getFieldByRole("destination1");
            const secondFlightDepartureField = getFieldByRole("origin2");
            const secondFlightArrivalField = getFieldByRole("destination2");
            const thirdFlightDepartureField = getFieldByRole("origin3");
            const thirdFlightArrivalField = getFieldByRole("destination3");

            const flightDetailsArray = [];

            // First flight
            if (flightDepartureField && flightArrivalField) {
              const departure = flightDepartureField.currentValue || flightDepartureField.defaultValue;
              const arrival = flightArrivalField.currentValue || flightArrivalField.defaultValue;
              if (departure && arrival) {
                flightDetailsArray.push({
                  label: "Flight Details",
                  departure: departure,
                  arrival: arrival
                });
              }
            }

            // Second flight (could be return flight or connecting flight)
            if (secondFlightDepartureField && secondFlightArrivalField) {
              const departure = secondFlightDepartureField.currentValue || secondFlightDepartureField.defaultValue;
              const arrival = secondFlightArrivalField.currentValue || secondFlightArrivalField.defaultValue;
              if (departure && arrival) {
                flightDetailsArray.push({
                  label: "Second Flight Details",
                  departure: departure,
                  arrival: arrival
                });
              }
            }

            // Third flight
            if (thirdFlightDepartureField && thirdFlightArrivalField) {
              const departure = thirdFlightDepartureField.currentValue || thirdFlightDepartureField.defaultValue;
              const arrival = thirdFlightArrivalField.currentValue || thirdFlightArrivalField.defaultValue;
              if (departure && arrival) {
                flightDetailsArray.push({
                  label: "Third Flight Details",
                  departure: departure,
                  arrival: arrival
                });
              }
            }

            return flightDetailsArray.length > 0 ? (
              <>
                <div className="space-y-3">
                  {flightDetailsArray.map((flight, index) => (
                    <div key={index} className="flex flex-col gap-2 p-2 px-5 border rounded-xl">
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        {flight.label}:
                      </p>
                      <div className="font-semibold uppercase">
                        <span className="text-muted-foreground text-sm">From </span>
                        <span className="text-primary">{flight.departure}</span>
                        <span className="text-muted-foreground text-sm"> to </span>
                        <span className="text-primary">{flight.arrival}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="bg-primary/10" />
              </>
            ) : null;
          })()}

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-base">
              <User className="w-4 h-4 text-primary" />
              Booking Details
            </h3>
            {(() => {
              const passengerField = getFieldByRole("name");
              const statusField = getFieldByRole("status");
              const dateField = getFieldByRole("date");
              const flightNumberField = getFieldByRole("flight");

              const detailsArray = [
                {
                  label: "Passenger",
                  value: passengerField?.currentValue || passengerField?.defaultValue,
                  type: "field"
                },
                {
                  label: "Flight Number",
                  value: flightNumberField?.currentValue || flightNumberField?.defaultValue,
                  type: "field"
                },
                {
                  label: "Booking Reference",
                  value: trackingId || undefined,
                  type: "field"
                },
                {
                  label: "Booking Status", 
                  value: statusField?.currentValue || statusField?.defaultValue,
                  type: "status"
                },
                {
                  label: "Booking Date",
                  value: dateField?.currentValue || dateField?.defaultValue,
                  type: "field"
                }
              ].filter(detail => !!detail.value);

              return detailsArray.map((detail, index) => (
                <div key={index} className="flex flex-col gap-2 p-2 px-5 border rounded-xl">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    {detail.label}:
                  </p>
                  {detail.type === "status" ? (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 bg-green-50 text-xs w-fit"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {detail.value}
                    </Badge>
                  ) : (
                    <p className="font-semibold uppercase">{detail.value}</p>
                  )}
                </div>
              ));
            })()}
          </div>
          <Separator className="bg-primary/10" />

          <Alert className="border-amber-200 bg-amber-50 py-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-sm">
              <strong>Test Booking:</strong> This is a test flight booking.
              <span className="underline decoration-dotted ml-1">
                Remove watermark to remove warning.
              </span>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </motion.div>
  );
};
