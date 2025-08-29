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
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { trackOrder } from "@/api/apiEndpoints";
import useToolStore from "@/store/toolStore";

export const FlightTracker: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSvgRaw, setFields, setStatus, setStatusMessage, fields } = useToolStore();

  // Get tracking ID from URL params or use default
  const trackingId = searchParams.get("trackingId") || "";

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        console.log("Tracking order with ID:", trackingId);
        const data = await trackOrder(trackingId);

        console.log("Track order response:", data);

        // Store the SVG and form fields in the store
        setSvgRaw(data.svg);
        setFields(data.form_fields);
        setStatus(data.status);

        if (data.error_message) {
          setStatusMessage(data.error_message);
        }
      } catch (err) {
        console.error("Error tracking order:", err);
      }
    };

    fetchTrackingData();
  }, [trackingId, setSvgRaw, setFields, setStatus, setStatusMessage]);

  // Helper function to find field by name pattern
  const findField = (pattern: string) => {
    return fields.find(field => 
      field.id.toLowerCase().includes(pattern.toLowerCase()) || 
      field.name.toLowerCase().includes(pattern.toLowerCase())
    );
  };

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
            const flightDepartureField = findField("Flight_Departure_Location");
            const flightArrivalField = findField("Flight_Arrival_Location");
            const secondFlightDepartureField = findField("Second_Flight_Departure_Location");
            const secondFlightArrivalField = findField("Second_Flight_Arrival_Location");
            const thirdFlightDepartureField = findField("Third_Flight_Departure_Location");
            const thirdFlightArrivalField = findField("Third_Flight_Arrival_Location");

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

            // Second flight
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
              const passengerField = findField("passenger_name") || findField("passenger");
              const statusField = findField("status");
              const dateField = findField("date") || findField("booking_date");

              const detailsArray = [
                {
                  label: "Passenger",
                  value: passengerField?.currentValue || passengerField?.defaultValue || "John Jojo",
                  type: "field"
                },
                {
                  label: "Booking Reference",
                  value: trackingId,
                  type: "field"
                },
                {
                  label: "Booking Status", 
                  value: statusField?.currentValue || statusField?.defaultValue || "OK",
                  type: "status"
                },
                {
                  label: "Booking Date",
                  value: dateField?.currentValue || dateField?.defaultValue || "27 Aug 2025",
                  type: "field"
                }
              ];

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
