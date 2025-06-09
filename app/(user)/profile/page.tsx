import React from "react";
import Image from "next/image";
import { NoBookings } from "@/components/shared/NoBookings";
import { getBookings } from "@/lib/actions/customer/booking.actions";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { BookingsGrid } from "../components/BookingGrid";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const bookings = await getBookings({ userId: user?.user?._id });

	return (
		<div>
			<div className="container">
				<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl line-clamp-1">
					Welcome back, {user?.user?.firstName}
				</h2>
				<div className="mt-4">
					<Link
						href="/about"
						className="bg-white hover:bg-[#F7F7F7] transition-all shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-lg p-8 text-center flex flex-col items-center justify-center gap-4"
					>
						{user?.user?.picture && (
							<Image
								src={
									user?.user?.picture ||
									DEFAULT_PROFILE_PICTURE
								}
								alt={
									`${user?.user?.firstName}'s picture` ||
									"User profile picture"
								}
								width={1000}
								height={1000}
								className="size-[150px] object-cover rounded-full"
							/>
						)}
						{!user?.user?.picture && (
							<div className="bg-primary rounded-full text-white size-[120px] p-8 flex items-center justify-center">
								<h2 className="text-6xl font-bold">
									{user?.user?.firstName.slice(0, 1)}
								</h2>
							</div>
						)}
						<h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">
							{user?.user?.firstName} {user?.user?.lastName}
						</h2>
					</Link>
					<div className="bg-white rounded-lg p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 hidden lg:grid">
						<h2 className="font-semibold text-2xl">
							Recent bookings
						</h2>
						{bookings.bookings?.length === 0 && <NoBookings />}
						{bookings?.bookings?.length !== 0 && (
							<div className="mt-4">
								<BookingsGrid bookings={bookings.bookings} />
							</div>
						)}
					</div>
					<div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<Link
							href="/bookings"
							className="bg-white hover:bg-[#F7F7F7] transition-all rounded-lg p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col items-center justify-center gap-4"
						>
							<Image
								src={"/assets/icons/folder.svg"}
								alt={"Folder icon"}
								width={1000}
								height={1000}
								className="size-[100px] object-cover"
							/>
							<h4 className="font-semibold text-base text-center md:text-lg">
								Past bookings
							</h4>
						</Link>
						<Link
							href="/spaces"
							className="bg-white hover:bg-[#F7F7F7] transition-all rounded-lg p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col items-center justify-center gap-4"
						>
							<Image
								src={"/assets/icons/explore.svg"}
								alt={"Explore globe icon"}
								width={1000}
								height={1000}
								className="size-[100px] object-cover"
							/>
							<h4 className="font-semibold text-base text-center md:text-lg">
								Explore spaces
							</h4>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
