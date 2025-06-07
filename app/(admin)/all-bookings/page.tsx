import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getBookings } from "@/lib/actions/admin/booking.actions";
import { BookingsDetails } from "../components/BookingsDetails";
import Pagination from "@/components/shared/Pagination";
import { DEFAULT_LIMIT } from "@/constants";

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
		<div className="py-8">
			<div className="container">
				<BookingsDetails query={query} bookings={bookings.bookings} />
				{bookings?.totalPages! > 1 && (
					<Pagination totalPages={bookings?.totalPages} page={page} />
				)}
			</div>
		</div>
	);
};

export default page;
