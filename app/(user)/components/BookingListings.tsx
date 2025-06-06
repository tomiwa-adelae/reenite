import React from "react";
import { IBooking } from "@/lib/database/models/booking.model";
import { BookingsTable } from "./BookingTable";
import { BookingsLists } from "./BookingLists";

export const BookingsListings = ({ bookings }: { bookings: IBooking[] }) => {
	return (
		<div>
			<BookingsLists bookings={bookings} />
			<BookingsTable bookings={bookings} />
		</div>
	);
};
