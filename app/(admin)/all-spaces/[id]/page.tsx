import { currentUser } from "@clerk/nextjs/server";
import { SpaceDetails } from "./edit-components/SpaceDetails";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { getCategories } from "@/lib/actions/admin/category.actions";

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
			hourlyPricing={spaceDetails?.space?.pricing.hourly}
			weeklyPricing={spaceDetails?.space?.pricing.weekly}
			dailyPricing={spaceDetails?.space?.pricing.daily}
			monthlyPricing={spaceDetails?.space?.pricing.monthly}
			spaceId={spaceDetails?.space?._id}
			availability={spaceDetails?.space?.availability}
			userId={user?.user?._id}
			categories={categories?.categories}
		/>
	);
};

export default page;
