import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Plane, PlaneTakeoff, PlaneLanding, CheckCircle, Shield, AlertTriangle, Calendar, User } from "lucide-react"

export const FlightTracker: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="overflow-hidden shadow-lg py-0">
        <CardHeader className="bg-primary text-white py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Check In Complete</h1>
                <p className="text-sm text-white/80">Flight confirmed and ready</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-sm">
              <Calendar className="w-3 h-3 mr-1" />
              21 Jul 2025
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Flight Route */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full border border-primary/20">
                  <PlaneTakeoff className="w-5 h-5 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-primary">SYD</p>
                  <p className="text-xs text-muted-foreground">Sydney</p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center relative mx-4">
                <div className="w-full h-px bg-primary/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/10 border border-primary/20 rounded-full p-1.5">
                    <Plane className="w-3 h-3 text-primary rotate-90" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full border border-primary/20">
                  <PlaneLanding className="w-5 h-5 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-primary">LIM</p>
                  <p className="text-xs text-muted-foreground">Lima</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-primary/10" />

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-base">
              <User className="w-4 h-4 text-primary" />
              Booking Details
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Passenger</p>
                  <p className="font-semibold">John Jojo</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Booking Date</p>
                  <p className="font-semibold">20 Jul 2025</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Reference</p>
                  <p className="font-mono text-xs bg-white/10 px-2 py-1 rounded border border-primary/10 break-all">
                    THW7V6KADUPOIPYEADPX
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Status</p>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    CHECKED IN
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-primary/10" />

          <Alert className="border-amber-200 bg-amber-50 py-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-sm">
              <strong>Test Booking:</strong> This is a test flight booking.
              <span className="underline decoration-dotted ml-1">Remove watermark to remove warning.</span>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
