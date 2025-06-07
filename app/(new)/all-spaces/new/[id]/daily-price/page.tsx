import { DailyPriceForm } from "@/app/(new)/components/forms/DailyPriceForm";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

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
					Now, set a daily price
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦15,000. You’ll set a weekly price next.
				</p>
			</div>
			<DailyPriceForm
				spaceId={spaceDetails?.space._id}
				userId={user?.user?._id}
				initialPricing={spaceDetails?.space?.dailyPricing}
			/>
		</div>
	);
};

export default page;
