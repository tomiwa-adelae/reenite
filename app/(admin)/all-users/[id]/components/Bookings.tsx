import { BookingsLists } from "@/app/(admin)/components/BookingsLists";
import { BookingsTable } from "@/app/(admin)/components/tables/BookingsTable";
import { IBooking } from "@/lib/database/models/booking.model";

export const Bookings = ({ bookings }: { bookings: IBooking[] }) => {
	return (
		<div>
			<BookingsLists bookings={bookings} />
			<BookingsTable bookings={bookings} />
		</div>
	);
};
