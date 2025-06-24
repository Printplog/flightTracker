import { trackOrder } from "@/api/apiEndpoints";
import useToolStore from "@/store/toolStore";
import type { FormField } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface TrackingData {
  trackingId: string;
  package: string;
  status: string;
  shipmentDate: string;
  destination: string;
  currentStatus: "processing" | "in_transit" | "delivered";
  isTestShipment: boolean;
  estimatedDelivery: string;
  name: string;
  email: string;
  weight: string;
}

export default function TrackingComponent() {
  const [trackingData, setTrackingData] = useState<TrackingData>();
  const [params] = useSearchParams();
  const id = params.get("trackingId") as string;
  const { setFields, getFieldValue } = useToolStore()

  const { data, isLoading: loading } = useQuery({
    queryKey: ["tracking", id],
    queryFn: ({ queryKey }) => trackOrder(queryKey[1]),
  });

  console.log(data);

  useEffect(() => {
    setFields(data?.form_fields as FormField[])
    setTrackingData({
      trackingId: data?.tracking_id as string,
      package: getFieldValue("Package_content") as string,
      status: data?.status as string,
      shipmentDate: getFieldValue("Invoice_date") as string,
      destination: getFieldValue("Recipient_address") as string,
      currentStatus: data?.status as  "processing" | "in_transit" | "delivered",
      isTestShipment: data?.test as boolean,
      estimatedDelivery: "Nil",
      name: getFieldValue("Recipient_name") as string,
      weight: getFieldValue("Package_weight") as string,
      email: getFieldValue("Recipient_email") as string,
    });
  }, [data, setFields, setTrackingData, getFieldValue]);

  const getStatusIcon = (
    status: string,
    isActive: boolean,
    isCompleted: boolean
  ) => {
    const baseClasses = `relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
      isCompleted
        ? "bg-primary text-primary-foreground shadow-lg"
        : isActive
        ? "bg-primary/20 text-primary border-2 border-primary"
        : "bg-muted text-muted-foreground"
    }`;

    const iconClasses = "w-5 h-5";

    if (status === "processing") {
      return (
        <div className={baseClasses}>
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {isActive && (
            <div className="absolute -inset-1 bg-primary/20 rounded-full animate-pulse"></div>
          )}
        </div>
      );
    } else if (status === "in_transit") {
      return (
        <div className={baseClasses}>
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
          {isActive && (
            <div className="absolute -inset-1 bg-primary/20 rounded-full animate-pulse"></div>
          )}
        </div>
      );
    } else {
      return (
        <div className={baseClasses}>
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    }
  };

  const getProgressLine = (
    _fromStatus: string,
    toStatus: string,
    currentStatus: string
  ): string => {
    const statusOrder = ["processing", "in_transit", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const toIndex = statusOrder.indexOf(toStatus);
    return currentIndex >= toIndex ? "bg-primary" : "bg-muted";
  };

  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded-lg w-1/3"></div>
            <div className="bg-card rounded-2xl p-8 shadow-sm">
              <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center bg-black">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-foreground font-medium">
            Tracking information not found
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please check your tracking ID and try again
          </p>
        </div>
      </div>
    );
  }

  const statusOrder = ["processing", "in_transit", "delivered"];
  const currentIndex = statusOrder.indexOf(trackingData.currentStatus);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live Tracking</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-900 to-green-700 text-primary-foreground p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Shipment Tracking</h1>
                <p className="text-primary-foreground/80 text-sm">
                  Real-time package monitoring
                </p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-xs text-primary-foreground/80">
                  Tracking ID
                </p>
                <p className="font-mono font-semibold text-sm">
                  {trackingData.trackingId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-primary-foreground/80 text-xs uppercase tracking-wide mb-1">
                  Package
                </p>
                <p className="font-semibold">{trackingData.package}</p>
              </div>
              <div>
                <p className="text-primary-foreground/80 text-xs uppercase tracking-wide mb-1">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-100 rounded-full"></div>
                  <p className="font-semibold">{trackingData.status?.replace("_", " ").toUpperCase()}</p>
                </div>
              </div>
              <div>
                <p className="text-primary-foreground/80 text-xs uppercase tracking-wide mb-1">
                  Shipped
                </p>
                <p className="font-semibold">{trackingData.shipmentDate}</p>
              </div>
              <div>
                <p className="text-primary-foreground/80 text-xs uppercase tracking-wide mb-1">
                  Est. Delivery
                </p>
                <p className="font-semibold">
                  {trackingData.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Test Shipment Warning */}
            {trackingData.isTestShipment && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-500 font-bold text-sm">
                      Test Environment
                    </p>
                    <p className="text-red-600 font-semibold text-sm">
                      This is a test shipment for demonstration purposes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Shipment Progress
              </h3>

              <div className="flex items-center justify-between mb-8">
                {statusOrder.map((status, index) => (
                  <React.Fragment key={status}>
                    <div className="flex flex-col items-center self-start">
                      {getStatusIcon(
                        status,
                        currentIndex === index,
                        currentIndex > index
                      )}
                      <span
                        className={`text-sm mt-3 font-medium ${
                          currentIndex >= index
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {status.replace("_", " ").toUpperCase()}
                      </span>
                      {currentIndex === index && (
                        <span className="text-xs text-primary mt-1 font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    {index < statusOrder.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-6 transition-colors duration-500 ${getProgressLine(
                          statusOrder[index],
                          statusOrder[index + 1],
                          trackingData.currentStatus
                        )}`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">
                  Shipment Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">
                      Name
                    </span>
                    <span className="text-foreground font-medium text-sm">
                      {trackingData.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">
                      Email
                    </span>
                    <span className="text-foreground font-medium text-sm">
                      {trackingData.email}
                    </span>
                  </div>
                </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground text-sm">
                      Weight
                    </span>
                    <span className="text-foreground font-medium text-sm">
                      {trackingData.weight}
                    </span>
                  </div>
                  
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Destination</h4>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">
                        {trackingData.destination}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Final destination
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
