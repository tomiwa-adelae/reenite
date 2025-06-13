import { AmenityBox } from "@/components/shared/AmenityBox";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { REENITE_CONTACT_PHONE_NUMBER } from "@/constants";
import { getBookingDetails } from "@/lib/actions/customer/booking.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { IAmenity } from "@/lib/database/models/space.model";
import { cn, formatDate, formatMoneyInput } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import {
	ArrowLeft,
	Ban,
	Building,
	CalendarCheck,
	CalendarDays,
	CircleCheckBig,
	CreditCard,
	Eye,
	Hash,
	Hourglass,
	MapPin,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CancelBookingButton } from "../../components/CancelBookingButton";
import { BookingId } from "../../components/BookingId";
import { BackButton } from "@/components/shared/BackButton";

import type { Metadata, ResolvingMetadata } from "next";
import { RetryPaymentButton } from "../../components/RetryPaymentButton";

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata
): Promise<Metadata> {
	try {
		const { id } = await params;
		const clerkUser = await currentUser();
		const user = await getUserInfo(clerkUser?.id!);

		const booking = await getBookingDetails({
			userId: user?.user?._id,
			bookingId: id,
		});
		return {
			title: `${booking?.booking?.bookingId} - My bookings - Reenite`,
			description: booking?.booking?.space?.description,
		};
	} catch (error) {
		return {
			title: "Book a space at Reenite - Coworking space in Uyo",
			description:
				"Hey friends, A space where skills are honed, ideas are born, and careers thrive. Join us at Reenite and be part of a community driving innovation in Uyo and beyond. Learn more See our services What we do Our mission is to bridge the gap between talent and opportunity, creating a space where skills are",
		};
	}
}

const page = async ({ params }: { params: any }) => {
	const { id } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const booking = await getBookingDetails({
		userId: user?.user?._id,
		bookingId: id,
	});

	if (booking?.status === 400) return <SpaceNotFound />;

	const coverPhoto =
		// @ts-ignore
		booking?.booking?.space?.photos?.find((photo) => photo?.cover) ||
		// @ts-ignore
		booking?.booking?.space?.photos[0];

	return (
		<div>
			<div className="container">
				<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
					<div className=" flex items-start justify-start gap-4">
						<BackButton slug={"/bookings"} />
						<div className="flex flex-col items-start justify-start gap-1">
							<h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
								{booking?.booking?.bookingId}
							</h2>
							<div className="flex items-center justify-start gap-2 capitalize">
								<Badge
									variant={
										booking?.booking?.paymentStatus ===
										"paid"
											? "success"
											: booking?.booking
													?.paymentStatus === "failed"
											? "destructive"
											: "default"
									}
								>
									{booking?.booking?.paymentStatus}
								</Badge>
								<Badge
									variant={
										booking?.booking?.bookingStatus ===
										"confirmed"
											? "success"
											: booking?.booking
													?.bookingStatus ===
											  "cancelled"
											? "destructive"
											: booking?.booking
													?.bookingStatus ===
											  "pending"
											? "warning"
											: "default"
									}
								>
									{booking?.booking?.bookingStatus}
								</Badge>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
						{booking?.booking?.bookingStatus !== "completed" &&
							booking?.booking.bookingStatus !== "cancelled" && (
								<CancelBookingButton
									userId={user?.user?._id}
									bookingId={booking?.booking._id}
									bookingStatus={
										booking?.booking?.bookingStatus
									}
								/>
							)}
						{booking?.booking?.paymentStatus !== "paid" && (
							<RetryPaymentButton
								userId={user?.user?._id}
								bookingId={booking?.booking?._id}
								email={user?.user?.email}
								totalPrice={booking?.booking?.totalAmount}
								firstName={user?.user?.firstName}
								lastName={user?.user?.lastName}
							/>
						)}
					</div>
				</div>
				<div
					className="bg-blend-darken bg-black/60 bg-scroll bg-no-repeat bg-cover bg-center py-16 flex items-center justify-center relative h-[50vh] rounded-lg mt-4"
					style={{
						backgroundImage: `url(${coverPhoto?.src})`,
					}}
				>
					<div className="absolute bottom-0 left-0 w-full py-4 text-white ">
						<div className="container">
							<Link
								href={`/spaces/${booking.booking.space._id}`}
								className="font-semibold text-xl md:text-2xl lg:text-3xl"
							>
								{booking.booking.space.title}
							</Link>
							<p className="text-sm md:text-base mt-1">
								<MapPin className="size-4 inline-block mr-2" />
								<span>
									{booking?.booking?.space?.city},{" "}
									{booking?.booking?.space?.state}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<div className="div">
						<h3 className="font-medium text-lg">Category</h3>
						<div className="flex items-center justify-start gap-4">
							<Image
								src={
									booking.booking.space.category.image ||
									"/assets/icons/office.svg"
								}
								alt={`${booking.booking.space.title} category icon`}
								width={1000}
								height={1000}
								className="size-[50px] md:size-[65px]"
							/>
							<h3 className="font-medium text-base md:text-lg">
								{booking.booking.space.category.name}
							</h3>
						</div>
					</div>
					<Separator className="my-4" />
					<div>
						<h3 className="font-medium text-lg">Space amenities</h3>
						<div className="flex flex-wrap gap-4 mt-4">
							{booking.booking.space.amenities.map(
								(amenity: IAmenity, index: string) => (
									<AmenityBox
										key={index}
										name={amenity.name!}
										icon={amenity.icon}
									/>
								)
							)}
						</div>
					</div>
					<Separator className="my-4" />
					<div>
						<h3 className="font-medium text-lg">Space location</h3>
						<div className="mt-2">
							<p className="text-sm md:text-base">
								<MapPin className="size-4 md:size-5 inline-block mr-2" />
								{booking.booking.space.address},{" "}
								{booking.booking.space.city},{" "}
								{booking.booking.space.city},{" "}
								{booking.booking.space.state},{" "}
								<span className="capitalize">
									{booking.booking.space.country}
								</span>
							</p>
						</div>
					</div>
					<Button asChild size="md" className="w-full mt-4">
						<Link href={`/spaces/${booking.booking.space._id}`}>
							<Eye className="size-5 mr-2" />
							View space
						</Link>
					</Button>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Booking Details</h3>
					<div className="flex flex-col gap-4 mt-4">
						<BookingId bookingId={booking.booking.bookingId} />
						<div className="flex items-center justify-start gap-2">
							<Building className="size-5" />
							<p className="text-sm md:text-base capitalize">
								Booking status: {booking.booking.bookingStatus}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CreditCard className="size-5" />
							<p className="text-sm md:text-base capitalize">
								Payment status: {booking.booking.paymentStatus}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5" />
							<p className="text-sm md:text-base">
								Date booked:{" "}
								{formatDate(booking.booking.createdAt)}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarCheck className="size-5" />
							<p className="text-sm md:text-base capitalize">
								Booking type: {booking.booking.bookingType}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5" />
							<p className="text-sm md:text-base">
								Start date: {booking.booking.startDate}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5" />
							<p className="text-sm md:text-base">
								End date: {booking.booking.endDate}
							</p>
						</div>
						{booking.booking.bookingType === "hourly" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5" />
								<p className="text-sm md:text-base">
									Hours: {booking.booking.noOfHours}{" "}
									{booking.booking.noOfHours === "1"
										? "hour"
										: "hours"}
								</p>
							</div>
						)}
						{booking.booking.bookingType === "daily" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5" />
								<p className="text-sm md:text-base">
									Days: {booking.booking.noOfDays}{" "}
									{booking.booking.noOfDays === "1"
										? "day"
										: "days"}
								</p>
							</div>
						)}
						{booking.booking.bookingType === "weekly" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5" />
								<p className="text-sm md:text-base">
									Days: {booking.booking.noOfWeeks}{" "}
									{booking.booking.noOfWeeks === "1"
										? "week"
										: "weeks"}
								</p>
							</div>
						)}
						{booking.booking.bookingType === "monthly" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5" />
								<p className="text-sm md:text-base">
									Days: {booking.booking.noOfMonths}{" "}
									{booking.booking.noOfMonths === "1"
										? "month"
										: "months"}
								</p>
							</div>
						)}
						<div className="flex items-center justify-start gap-2">
							<Users className="size-5" />
							<p className="text-sm md:text-base">
								Users: {booking.booking.noOfUsers}{" "}
								{booking.booking.noOfUsers === "1"
									? "user"
									: "users"}
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Payment Information</h3>
					<div className="grid gap-4 mt-4">
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">Amount</p>
							<p>
								₦{formatMoneyInput(booking.booking.totalAmount)}
							</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Transaction Reference
							</p>
							<p>
								{booking?.booking?.paymentStatus === "paid" ? (
									`TXN_${booking.booking.transactionId}`
								) : (
									<span className="text-destructive italic">
										No Transaction ID
									</span>
								)}
							</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Internal Ref
							</p>
							<p>
								{booking?.booking?.paymentStatus === "paid" ? (
									`TRX_${booking.booking.trxref}`
								) : (
									<span className="text-destructive italic">
										No TRX Number
									</span>
								)}
							</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Payment date
							</p>
							<p>
								{booking?.booking?.paymentStatus === "paid" ? (
									formatDate(booking.booking.updatedAt)
								) : (
									<span className="text-destructive italic">
										No payment
									</span>
								)}
							</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">Status</p>
							<p
								className={cn(
									"capitalize",
									booking?.booking?.paymentStatus === "paid"
										? "text-green-400"
										: booking?.booking?.paymentStatus ===
										  "failed"
										? "text-destructive"
										: booking?.booking?.paymentStatus ===
										  "pending"
										? "text-orange-400"
										: "text-black"
								)}
							>
								<CircleCheckBig className="size-3 lg:size-5 inline-block mr-2" />
								{booking.booking.paymentStatus}
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-lg bg-yellow-100 border-yellow-200 border-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">
						Having issues with this booking?
					</h3>
					<div className="grid gap-4 mt-2">
						<p className="text-sm md:text-base items-center justify-between gap-4">
							Contact our support team{" "}
							<Link
								className="text-secondary underline font-medium"
								href="/contact"
							>
								here
							</Link>{" "}
							or call us at{" "}
							<a
								className="text-secondary underline font-medium"
								href={`tel:${REENITE_CONTACT_PHONE_NUMBER}`}
							>
								{REENITE_CONTACT_PHONE_NUMBER}
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
