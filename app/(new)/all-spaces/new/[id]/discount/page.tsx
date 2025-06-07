import React from "react";
import { DiscountForm } from "@/app/(new)/components/forms/DiscountForm";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import SpaceNotFound from "@/components/shared/SpaceNotFound";

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
					Add discount
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Help your space stand out to get booked faster and earn your
					first reviews.
				</p>
			</div>
			<DiscountForm
				spaceId={spaceDetails?.space._id}
				userId={user?.user?._id}
				hourlyDiscount={spaceDetails?.space?.hourlyDiscount}
				dailyDiscount={spaceDetails?.space?.dailyDiscount}
				weeklyDiscount={spaceDetails?.space?.weeklyDiscount}
				monthlyDiscount={spaceDetails?.space?.monthlyDiscount}
			/>
		</div>
	);
};

export default page;
