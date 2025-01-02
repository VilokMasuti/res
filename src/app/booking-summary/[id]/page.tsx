import { getBooking } from "@/app/actions/booking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

export default async function BookingSummary({
  params,
}: {
  params: { id: string };
}) {
  const result = await getBooking(params.id);

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-red-600">
              Booking Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">{result.error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { booking } = result;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Booking Confirmation
          </CardTitle>
          <CardDescription className="text-center">
            Thank you for your reservation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">Date:</div>
            <div>{format(new Date(booking.date), "PPP")}</div>
            <div className="font-semibold">Time:</div>
            <div>{booking.time}</div>
            <div className="font-semibold">Floor:</div>
            <div>{booking.floor}</div>
            <div className="font-semibold">Number of Guests:</div>
            <div>{booking.guests}</div>
            <div className="font-semibold">Name:</div>
            <div>{booking.name}</div>
            <div className="font-semibold">Email:</div>
            <div>{booking.email}</div>
            <div className="font-semibold">Phone:</div>
            <div>{booking.phone}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
