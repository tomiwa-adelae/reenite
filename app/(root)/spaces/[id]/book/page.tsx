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
import { FAQs } from "@/components/shared/FAQs";

import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params;
	try {
		const spaceDetails = await getSpaceDetails(id);
		return {
			title: `${spaceDetails?.space?.title} - Booking - Reenite`,
			description: spaceDetails?.space?.description,
		};
	} catch (error) {
		return {
			title: "Book a space at Reenite - Coworking space in Uyo",
			description:
				"Hey friends, A space where skills are honed, ideas are born, and careers thrive. Join us at Reenite and be part of a community driving innovation in Uyo and beyond. Learn more See our services What we do Our mission is to bridge the gap between talent and opportunity, creating a space where skills are",
		};
	}
}

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

	if (spaceDetails?.status === 400 || spaceDetails?.space.status !== "active")
		return <SpaceNotFound />;

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
							className="rounded-lg object-cover size-[100px]"
						/>
						<div>
							<Link
								href={`/spaces/${spaceDetails?.space?._id}`}
								className="hover:text-secondary transition-all font-medium text-lg md:text-2xl lg:text-3xl line-clamp-2"
							>
								{spaceDetails?.space.title}
							</Link>
							<p className="text-xs md:text-sm lg:text-base text-muted-foreground mt-1">
								{spaceDetails?.space.address},{" "}
								{spaceDetails?.space.city},{" "}
								{spaceDetails?.space?.state},{" "}
								<span className="capitalize">
									{spaceDetails?.space?.country}
								</span>
							</p>
						</div>
					</div>
					<Button className="w-full md:w-auto" asChild size="md">
						<Link href="/spaces">Change space</Link>
					</Button>
				</div>
				<Separator className="my-4 md:my-6" />
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
					category={spaceDetails?.space.category?.name}
				/>
			</div>
		</div>
	);
};

export default page;
