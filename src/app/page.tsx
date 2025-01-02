import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Gourmet Heights Restaurant
          </CardTitle>
          <CardDescription className="text-center">
            Experience dining excellence across three floors
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
            <BookingForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <Suspense fallback={<div>Loading calendar...</div>}>
              <AvailabilityCalendar />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
