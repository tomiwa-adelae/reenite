import { Logo } from "@/components/shared/Logo";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { Button } from "@/components/ui/button";
import { getBookingDetails } from "@/lib/actions/customer/booking.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookingId } from "./components/BookingId";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
	title: "Successful booking - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

const page = async ({ searchParams }: { searchParams: any }) => {
	const { id } = await searchParams;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const bookingDetails = await getBookingDetails({
		bookingId: id,
		userId: user?.user?._id,
	});

	if (bookingDetails?.status === 400) return <SpaceNotFound />;

	if (bookingDetails?.booking?.paymentStatus !== "paid")
		redirect(
			`/spaces/${bookingDetails?.booking?.space?._id}/book/failed?id=${bookingDetails?.booking?._id}`
		);

	const year = new Date().getFullYear();

	return (
		<div className="bg-[#F7F7F7] py-16 flex flex-col items-center justify-center min-h-screen">
			<div className="container grid grid-cols-1 lg:grid-cols-5 gap-8">
				<div className="text-center md:text-left col-span-3 flex flex-col items-start justify-center">
					<div className="flex items-center md:justify-start mx-auto md:mx-0 justify-center">
						<Logo />
					</div>
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-6 mb-4 font-bold">
						Booking confirmed successfully!
					</h1>
					<p className="text-sm md:text-base text-muted-foreground lg:text-base leading-relaxed font-medium">
						Thank you for choosing to book with Reenite! Your
						reservation is confirmed. Please keep your booking ID
						safe. You will need it for access. Booking ID:{" "}
						<BookingId
							bookingId={bookingDetails?.booking.bookingId}
						/>
					</p>
					<div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-6 md:mt-8 w-full">
						<Button className="w-full md:w-auto" asChild size="lg">
							<Link
								href={`/bookings/${bookingDetails?.booking?._id}`}
							>
								View booking details
							</Link>
						</Button>
						<Button
							asChild
							variant={"ghost"}
							className="underline hover:bg-white w-full md:w-auto"
							size="lg"
						>
							<Link href="/spaces">Go back to home</Link>
						</Button>
					</div>
				</div>
				<div className="col-span-3 lg:col-span-2 grid gap-6">
					<div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl bg-white p-4 md:px-8 flex items-center justify-between gap-4 py-6">
						<div>
							<h2
								// style={{ fontFamily: "ClashDisplay" }}
								className="font-bold text-2xl md:text-3xl"
							>
								₦
								{formatMoneyInput(
									bookingDetails?.booking.totalAmount
								)}
							</h2>
							<p className="text-sm md:text-base text-muted-foreground">
								Payment success!
							</p>
						</div>
						<div className="bg-primary rounded-full p-4">
							<Image
								src={"/assets/icons/check.svg"}
								alt={"Check icon"}
								width={1000}
								height={1000}
								className="size-[20px] md:size-[30px] lg:size-[40px] object-cover invert"
							/>
						</div>
					</div>
					<div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl bg-white p-4 md:p-8">
						<h2 className="font-medium text-xl md:text-2xl">
							Booking summary
						</h2>
						<div className="space-y-6 mt-4 text-sm text-muted-foreground">
							<p className="flex items-center justify-between gap-4">
								Space:{" "}
								<span className="text-black font-semibold">
									{bookingDetails?.booking.space.title}
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								Booking type:{" "}
								<span className="text-black font-semibold capitalize">
									{bookingDetails?.booking?.bookingType}{" "}
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								Start date:{" "}
								<span className="text-black font-semibold">
									{bookingDetails?.booking?.startDate}
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								End date:{" "}
								<span className="text-black font-semibold">
									{bookingDetails?.booking?.endDate}
								</span>
							</p>
							{bookingDetails?.booking?.bookingType ===
								"hourly" && (
								<p className="flex items-center justify-between gap-4">
									Number of hours:{" "}
									<span className="text-black font-semibold">
										{bookingDetails?.booking?.noOfHours}{" "}
										{bookingDetails?.booking?.noOfHours ===
										"1"
											? "hour"
											: "hours"}
									</span>
								</p>
							)}
							{bookingDetails?.booking?.bookingType ===
								"daily" && (
								<p className="flex items-center justify-between gap-4">
									Number of days:{" "}
									<span className="text-black font-semibold">
										{bookingDetails?.booking?.noOfDays}{" "}
										{bookingDetails?.booking?.noOfDays ===
										"1"
											? "day"
											: "days"}
									</span>
								</p>
							)}
							{bookingDetails?.booking?.bookingType ===
								"weekly" && (
								<p className="flex items-center justify-between gap-4">
									Number of weeks:{" "}
									<span className="text-black font-semibold">
										{bookingDetails?.booking?.noOfWeeks}{" "}
										{bookingDetails?.booking?.noOfWeeks ===
										"1"
											? "week"
											: "weeks"}
									</span>
								</p>
							)}
							{bookingDetails?.booking?.bookingType ===
								"monthly" && (
								<p className="flex items-center justify-between gap-4">
									Number of months:{" "}
									<span className="text-black font-semibold">
										{bookingDetails?.booking?.noOfMonths}{" "}
										{bookingDetails?.booking?.noOfMonths ===
										"1"
											? "month"
											: "months"}
									</span>
								</p>
							)}
							<p className="flex items-center justify-between gap-4">
								Number of users:{" "}
								<span className="text-black font-semibold">
									{bookingDetails?.booking?.noOfUsers}{" "}
									{bookingDetails?.booking?.noOfUsers === "1"
										? "user"
										: "users"}
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								Booking ID:{" "}
								<BookingId
									bookingId={
										bookingDetails?.booking.bookingId
									}
								/>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container text-center text-sm md:text-base w-full mt-8">
				&copy; {year} Reenite. All rights reserved.
			</div>
		</div>
	);
};

export default page;
