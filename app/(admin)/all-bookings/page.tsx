import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getBookings } from "@/lib/actions/admin/booking.actions";
import { BookingsDetails } from "../components/BookingsDetails";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const bookings = await getBookings({ userId: user?.user?._id });
	return (
		<div className="py-8">
			<div className="container">
				<BookingsDetails bookings={bookings.bookings} />
			</div>
		</div>
	);
};

export default page;
