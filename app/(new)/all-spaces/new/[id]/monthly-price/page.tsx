import React from "react";
import { MonthlyPriceForm } from "@/app/(new)/components/forms/MonthlyPriceForm";
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
					Now, set a monthly price
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦25,000. You’ll set a discount next.
				</p>
			</div>
			<MonthlyPriceForm
				spaceId={spaceDetails?.space._id}
				userId={user?.user?._id}
				initialPricing={spaceDetails?.space?.monthlyPricing}
			/>
		</div>
	);
};

export default page;
