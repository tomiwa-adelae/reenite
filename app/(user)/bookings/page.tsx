import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getBookings } from "@/lib/actions/customer/booking.actions";
import { BookingsDetails } from "../components/BookingDetails";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const bookings = await getBookings({ userId: user?.user?._id });

	return (
		<div>
			<div className="container">
				<BookingsDetails bookings={bookings.bookings} />
			</div>
		</div>
	);
};

export default page;
