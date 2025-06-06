import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SpaceContactDetails } from "@/components/spaces/SpaceContactDetails";
import { getSpaceDetails } from "@/lib/actions/customer/space.actions";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import Link from "next/link";
import { BookingDetails } from "@/components/BookingDetails";

const page = async ({
	params,
	searchParams,
}: {
	params: any;
	searchParams: any;
}) => {
	const { hours, days, weeks, months, users, bookingStartDate, booking } =
		await searchParams;
	const { id } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	const spaceDetails = await getSpaceDetails(id);

	if (spaceDetails?.status === 400) return <SpaceNotFound />;

	// Determine the correct discount based on booking type
	const discount =
		booking === "hourly"
			? spaceDetails?.space?.hourlyDiscount
			: booking === "daily"
			? spaceDetails?.space?.dailyDiscount
			: booking === "weekly"
			? spaceDetails?.space?.weeklyDiscount
			: booking === "monthly"
			? spaceDetails?.space?.monthlyDiscount
			: "0";
	// Determine the correct discount based on booking type
	const pricing =
		booking === "hourly"
			? spaceDetails?.space?.pricing?.hourly
			: booking === "daily"
			? spaceDetails?.space?.pricing?.daily
			: booking === "weekly"
			? spaceDetails?.space?.pricing?.weekly
			: booking === "monthly"
			? spaceDetails?.space?.pricing?.monthly
			: "0";

	return (
		<div className="bg-white pt-8 pb-16 relative">
			<div className="container">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className="flex items-center justify-start gap-4">
						<Image
							src={
								spaceDetails?.space?.photos.find(
									(photo: any) => photo.cover
								).src ||
								// @ts-ignore
								space?.photos[0].src ||
								DEFAULT_SPACE_IMAGE
							}
							alt={spaceDetails?.space?.title || "Space image"}
							width={1000}
							height={1000}
							className="rounded-2xl object-cover size-[100px]"
						/>
						<div>
							<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
								{spaceDetails?.space.title}
							</h2>
							<p className="text-sm lg:text-base text-muted-foreground mt-1">
								{spaceDetails?.space.address},{" "}
								{spaceDetails?.space.city},{" "}
								{spaceDetails?.space?.state},{" "}
								{spaceDetails?.space?.country}
							</p>
						</div>
					</div>
					<Button asChild size="md">
						<Link href="/spaces">Change space</Link>
					</Button>
				</div>
				<Separator className="my-8" />
				<BookingDetails
					firstName={user?.user?.firstName}
					lastName={user?.user?.lastName}
					email={user?.user?.email}
					phoneNumber={user?.user?.phoneNumber}
					noOfUsers={users}
					noOfHours={hours}
					noOfDays={days}
					noOfWeeks={weeks}
					noOfMonths={months}
					booking={booking}
					discount={discount}
					bookingStartDate={bookingStartDate}
					pricing={pricing}
					spaceId={spaceDetails?.space?._id}
					userId={user?.user?._id}
				/>
			</div>
		</div>
	);
};

export default page;
