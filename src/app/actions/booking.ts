"use server";

import { z } from "zod";
import { format } from "date-fns";
import Booking from "@/models/Booking";
import dbConnect from "@/lib/dbConnect";
import { console } from "inspector";
const bookingSchema = z.object({
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1).max(10),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  floor: z.number().min(1).max(3),
  tableId: z.number().min(1),
});

type BookingType = z.infer<typeof bookingSchema>;

export async function createBooking(data: BookingType) {
  try {
    await dbConnect();
    const validatedData = bookingSchema.parse(data);
    const booking = new Booking(validatedData);
    const savedBooking = await booking.save();
    return { success: true, booking: savedBooking.toObject() };
  } catch (error) {
    console.error("Failed to create booking:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error:
          "Invalid booking data: " +
          error.errors.map((e) => e.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: "Failed to create booking: " + error.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while creating the booking.",
    };
  }
}

export async function getBooking(id: string) {
  try {
    await dbConnect();
    const booking = await Booking.findById(id);
    if (!booking) {
      return { success: false, error: "Booking not found" };
    }
    return { success: true, booking: booking.toObject() };
  } catch (error) {
    console.error("Failed to get booking:", error);
    return {
      success: false,
      error: "Failed to retrieve booking. Please try again.",
    };
  }
}

export async function deleteBooking(id: string) {
  try {
    await dbConnect();
    const result = await Booking.findByIdAndDelete(id);
    if (!result) {
      return { success: false, error: "Booking not found" };
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return {
      success: false,
      error: "Failed to delete booking. Please try again.",
    };
  }
}

export async function getAvailability(date: Date) {
  await dbConnect();

  const formattedDate = format(date, "yyyy-MM-dd");
  const bookings = await Booking.find({ date: formattedDate });

  const allTimeSlots = ["18:00", "19:00", "20:00", "21:00"];
  const bookedSlots = bookings.map((booking) => booking.time);

  return allTimeSlots.map((slot) => ({
    time: slot,
    available: !bookedSlots.includes(slot),
  }));
}

export async function getAvailableTables(
  date: string,
  time: string,
  floor: number
) {
  await dbConnect();
  const bookings = await Booking.find({ date, time, floor });
  const bookedTableIds = bookings.map((booking) => booking.tableId);

  // Assuming we have 10 tables per floor
  const allTableIds = Array.from({ length: 10 }, (_, i) => i + 1);
  const availableTables = allTableIds.filter(
    (id) => !bookedTableIds.includes(id)
  );

  return availableTables;
}
