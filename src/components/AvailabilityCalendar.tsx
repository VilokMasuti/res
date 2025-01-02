"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAvailability } from "@/app/actions/booking";
import { format } from "date-fns";

export default function AvailabilityCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<
    Array<{ time: string; available: boolean }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAvailability() {
      if (date) {
        setIsLoading(true);
        try {
          const availabilityData = await getAvailability(date);
          setAvailability(availabilityData);
        } catch (error) {
          console.error("Failed to fetch availability:", error);
          setAvailability([]);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchAvailability();
  }, [date]);

  return (
    <Card>
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-t-lg"
        />
        {date && (
          <div className="p-4">
            <h3 className="font-semibold mb-2">
              Available time slots for {format(date, "MMMM d, yyyy")}:
            </h3>
            {isLoading ? (
              <p>Loading availability...</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {availability.map(({ time, available }) => (
                  <Badge
                    key={time}
                    variant={available ? "outline" : "secondary"}
                  >
                    {time} - {available ? "Available" : "Booked"}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
