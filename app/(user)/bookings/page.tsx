import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getBookings } from "@/lib/actions/customer/booking.actions";
import { BookingsDetails } from "../components/BookingDetails";
import Pagination from "@/components/shared/Pagination";
import { DEFAULT_LIMIT } from "@/constants";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "My bookings - Reenite",
};

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const bookings = await getBookings({
		userId: user?.user?._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	return (
		<div>
			<div className="container">
				<BookingsDetails bookings={bookings.bookings} query={query} />
				{bookings?.totalPages! > 1 && (
					<Pagination totalPages={bookings?.totalPages} page={page} />
				)}
			</div>
		</div>
	);
};

export default page;
