import React from "react";
import { BookingsLists } from "./BookingsLists";
import { BookingsTable } from "./tables/BookingsTable";
import { IBooking } from "@/lib/database/models/booking.model";

export const BookingsListings = ({ bookings }: { bookings: IBooking[] }) => {
	return (
		<div>
			<BookingsLists bookings={bookings} />
			<BookingsTable bookings={bookings} />
		</div>
	);
};
