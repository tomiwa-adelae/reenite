import { AmenityBox } from "@/components/shared/AmenityBox";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { REENITE_CONTACT_PHONE_NUMBER } from "@/constants";
import { getBookingDetails } from "@/lib/actions/customer/booking.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { IAmenity } from "@/lib/database/models/space.model";
import { formatDate, formatMoneyInput } from "@/lib/utils";
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
		booking.booking.space?.photos.find((photo) => photo.cover) ||
		// @ts-ignore
		booking.booking.space?.photos[0];

	return (
		<div>
			<div className="container">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className=" flex items-start justify-start gap-4">
						<Button
							size="icon"
							className="size-10 lg:size-12 bg-[#F7F7F7]"
							variant="ghost"
							asChild
						>
							<Link href="/bookings">
								<ArrowLeft className="size-4 lg:size-6" />
							</Link>
						</Button>
						<div className="flex flex-col items-start justify-start gap-1">
							<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
								{booking.booking.bookingId}
							</h2>
							<div className="flex items-center justify-start gap-2 capitalize">
								<Badge variant="success">
									{booking.booking.paymentStatus}
								</Badge>
								<Badge variant="success">
									{booking.booking.bookingStatus}
								</Badge>
							</div>
						</div>
					</div>
					<Button
						className="w-full md:w-auto"
						size="md"
						variant="destructive"
					>
						<Ban /> Cancel booking
					</Button>
				</div>
				<div
					className="bg-blend-overlay bg-scroll bg-no-repeat bg-cover bg-center py-16 flex items-center justify-center relative h-[50vh] rounded-2xl mt-4"
					style={{
						backgroundImage: `url(${coverPhoto.src})`,
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
									{booking.booking.space.city},{" "}
									{booking.booking.space.state}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<div className="div">
						<h3 className="font-medium text-lg">Category</h3>
						<div className="mt-4 flex items-center justify-start gap-4">
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
						<div className="mt-4">
							<p className="text-muted-foreground text-sm md:text-base">
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
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Booking Details</h3>
					<div className="flex flex-col gap-4 mt-4">
						<div className="flex items-center justify-start gap-2">
							<Hash className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Booking ID: {booking.booking.bookingId}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Building className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground capitalize">
								Booking status: {booking.booking.bookingStatus}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CreditCard className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground capitalize">
								Payment status: {booking.booking.paymentStatus}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Date booked:{" "}
								{formatDate(booking.booking.createdAt)}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarCheck className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground capitalize">
								Booking type: {booking.booking.bookingType}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Start date: {booking.booking.startDate}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								End date: {booking.booking.endDate}
							</p>
						</div>
						{booking.booking.bookingType === "hourly" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5 text-muted-foreground" />
								<p className="text-sm md:text-base text-muted-foreground">
									Hours: {booking.booking.noOfHours}{" "}
									{booking.booking.noOfHours === "1"
										? "hour"
										: "hours"}
								</p>
							</div>
						)}
						{booking.booking.bookingType === "daily" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5 text-muted-foreground" />
								<p className="text-sm md:text-base text-muted-foreground">
									Days: {booking.booking.noOfDays}{" "}
									{booking.booking.noOfDays === "1"
										? "day"
										: "days"}
								</p>
							</div>
						)}
						{booking.booking.bookingType === "weekly" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5 text-muted-foreground" />
								<p className="text-sm md:text-base text-muted-foreground">
									Days: {booking.booking.noOfWeeks}{" "}
									{booking.booking.noOfWeeks === "1"
										? "week"
										: "weeks"}
								</p>
							</div>
						)}
						{booking.booking.bookingType === "monthly" && (
							<div className="flex items-center justify-start gap-2">
								<Hourglass className="size-5 text-muted-foreground" />
								<p className="text-sm md:text-base text-muted-foreground">
									Days: {booking.booking.noOfMonths}{" "}
									{booking.booking.noOfMonths === "1"
										? "month"
										: "months"}
								</p>
							</div>
						)}
						<div className="flex items-center justify-start gap-2">
							<Users className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Users: {booking.booking.noOfUsers}{" "}
								{booking.booking.noOfUsers === "1"
									? "user"
									: "users"}
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
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
							<p>TXN_{booking.booking.transactionId}</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Internal Ref
							</p>
							<p>TRX_{booking.booking.trxref}</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Payment date
							</p>
							<p>{formatDate(booking.booking.createdAt)}</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">Status</p>
							<p className="text-green-400 capitalize">
								<CircleCheckBig className="size-3 lg:size-5 inline-block mr-2" />
								{booking.booking.paymentStatus}
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-yellow-100 border-yellow-200 border-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
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
