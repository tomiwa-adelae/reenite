import { AmenityBox } from "@/components/shared/AmenityBox";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
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
	Car,
	Check,
	CircleCheckBig,
	Clock,
	CreditCard,
	Eye,
	Hash,
	Hourglass,
	Mail,
	MapPin,
	Phone,
	Repeat2,
	Users,
	Wifi,
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
		<div className="py-8">
			<div className="container">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className=" flex items-start justify-start gap-4">
						<Button
							size="icon"
							className="size-10 lg:size-12 bg-[#F7F7F7]"
							variant="ghost"
							asChild
						>
							<Link href="/all-bookings">
								<ArrowLeft className="size-4 lg:size-6" />
							</Link>
						</Button>
						<div className="flex flex-col items-start justify-start gap-1">
							<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
								BK-{booking.booking.bookingId}
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
								href={`/all-spaces/${booking.booking.space._id}`}
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
					<Button asChild size="md" className="w-full">
						<Link href={`/all-spaces/${booking.booking.space._id}`}>
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
							<p className="text-sm md:text-base text-muted-foreground">
								Booking type: {booking.booking.bookingType}
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Start date:{" "}
								{formatDate(booking.booking.startDate)}
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
						<div className="flex items-center justify-start gap-2">
							<Users className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Users: {booking.booking.noOfUsers} users
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">
						Customer Information
					</h3>
					<div className="grid mt-4 gap-4">
						<div className="flex items-center justify-start gap-2">
							<Image
								src={
									booking?.booking.user.picture ||
									DEFAULT_PROFILE_PICTURE
								}
								alt={
									`${booking.booking.user.firstName}'s` ||
									"User profile picture"
								}
								width={1000}
								height={1000}
								className="size-[40px] lg:size-[50px] object-cover rounded-full"
							/>
							<h4 className="font-medium text-base lg:text-lg">
								{booking.booking.user.firstName}{" "}
								{booking.booking.user.lastName}
							</h4>
						</div>
						<Link
							href={`mailto:${booking.booking.user.email}`}
							className="text-sm md:text-base hover:text-secondary hover:underline transition-all"
						>
							<p>
								<Mail className="size-4 md:size-5 inline-block mr-2" />
								<span>{booking.booking.user.email}</span>
							</p>
						</Link>
						{booking.booking.user.phoneNumber && (
							<Link
								href={`tel:${booking.booking.user.phoneNumber}`}
								className="text-sm md:text-base"
							>
								<p>
									<Phone className="size-4 md:size-5 inline-block mr-2" />
									<span>
										{booking.booking.user.phoneNumber}
									</span>
								</p>
							</Link>
						)}
						<Button asChild size="md" className="w-full">
							<Link
								href={`/all-users/${booking.booking.user._id}`}
							>
								<Eye className="size-5 mr-2" />
								View customer
							</Link>
						</Button>
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
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Actions</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<Button
							className="rounded-2xl flex items-center justify-center flex-col gap-2 py-16"
							size="lg"
							asChild
						>
							<Check className="size-5" />
							<span>Mark as completed</span>
						</Button>
						<Button
							className="rounded-2xl flex items-center justify-center flex-col gap-2 py-16"
							size="lg"
							variant={"destructive"}
						>
							<Ban className="size-5" />
							<span>Cancel booking</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
