import { currentUser } from "@clerk/nextjs/server";
import { SpaceDetails } from "./edit-components/SpaceDetails";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { getCategories } from "@/lib/actions/admin/category.actions";

import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata
): Promise<Metadata> {
	try {
		const { id } = await params;
		const clerkUser = await currentUser();
		const user = await getUserInfo(clerkUser?.id!);

		const spaceDetails = await getSpaceDetails({
			userId: user?.user?._id,
			spaceId: id,
		});
		return {
			title: `${spaceDetails?.space?.title} - All spaces - Reenite`,
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

const page = async ({ params }: { params: any }) => {
	const { id } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const spaceDetails = await getSpaceDetails({
		userId: user?.user?._id,
		spaceId: id,
	});

	const categories = await getCategories({ userId: user?.user?._id });

	if (spaceDetails?.status === 400) return <SpaceNotFound />;
	return (
		<SpaceDetails
			title={spaceDetails?.space?.title}
			photos={spaceDetails?.space?.photos}
			description={spaceDetails?.space?.description}
			city={spaceDetails?.space?.city}
			state={spaceDetails?.space?.state}
			country={spaceDetails?.space?.country}
			address={spaceDetails?.space?.address}
			zipCode={spaceDetails?.space?.zipCode}
			category={spaceDetails?.space?.category}
			amenities={spaceDetails?.space?.amenities}
			hourlyDiscount={spaceDetails?.space?.hourlyDiscount}
			dailyDiscount={spaceDetails?.space?.dailyDiscount}
			weeklyDiscount={spaceDetails?.space?.weeklyDiscount}
			monthlyDiscount={spaceDetails?.space?.monthlyDiscount}
			hourlyPricing={spaceDetails?.space?.pricing?.hourly}
			weeklyPricing={spaceDetails?.space?.pricing?.weekly}
			dailyPricing={spaceDetails?.space?.pricing?.daily}
			monthlyPricing={spaceDetails?.space?.pricing?.monthly}
			spaceId={spaceDetails?.space?._id}
			availability={spaceDetails?.space?.availability}
			userId={user?.user?._id}
			categories={categories?.categories}
		/>
	);
};

export default page;
