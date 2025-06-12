// import { HourlyPriceForm } from "@/app/(new)/components/forms/HourlyPriceForm";
import { HourlyPriceForm } from "@/app/(new)/components/forms/HourlyPriceForm";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Set hourly pricing - Admin - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

const page = async ({ params }: { params: any }) => {
	const { id } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const spaceDetails = await getSpaceDetails({
		userId: user?.user?._id,
		spaceId: id,
	});

	if (spaceDetails?.status === 400) return <SpaceNotFound />;
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
					Now, set a hourly pricing
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦5,000. You’ll set a daily price next.
				</p>
			</div>
			<HourlyPriceForm
				spaceId={spaceDetails?.space._id}
				userId={user?.user?._id}
				initialPricing={spaceDetails?.space?.hourlyPricing}
			/>
		</div>
	);
};

export default page;
