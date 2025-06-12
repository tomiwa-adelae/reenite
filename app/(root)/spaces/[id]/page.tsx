import { SpacePhotos } from "@/components/spaces/SpacePhotos";
import { AboutSpace } from "@/components/spaces/AboutSpace";
import { SpaceBooking } from "@/components/spaces/SpaceBooking";
import { SpaceAmenities } from "@/components/spaces/SpaceAmenities";
import { SpaceContactInfo } from "@/components/spaces/SpaceContactInfo";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Separator } from "@/components/ui/separator";
import { getSpaceDetails } from "@/lib/actions/customer/space.actions";
import { SpaceAvailability } from "@/components/spaces/SpaceAvailability";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { SpaceDetails } from "@/components/spaces/SpaceDetails";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
	{ params }: any,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { id } = await params;
	try {
		const spaceDetails = await getSpaceDetails(id);
		return {
			title: `${spaceDetails?.space?.title} - Reenite`,
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
	const spaceDetails = await getSpaceDetails(id);

	if (spaceDetails?.status === 400 || spaceDetails?.space.status !== "active")
		return <SpaceNotFound />;

	return (
		<div className="relative pt-8 pb-16">
			<div className="container">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					{spaceDetails?.space.title}
				</h2>
				<p className="text-sm lg:text-base text-muted-foreground mt-2">
					{spaceDetails?.space.address}, {spaceDetails?.space.city},{" "}
					{spaceDetails?.space?.state},{" "}
					<span className="capitalize">
						{spaceDetails?.space?.country}
					</span>
				</p>
				<SpacePhotos photos={spaceDetails?.space.photos} />
				<SpaceDetails
					description={spaceDetails?.space.description}
					category={spaceDetails?.space.category}
					hourlyPricing={spaceDetails?.space.pricing.hourly}
					weeklyPricing={spaceDetails?.space.pricing.weekly}
					dailyPricing={spaceDetails?.space.pricing.daily}
					monthlyPricing={spaceDetails?.space.pricing.monthly}
					hourlyDiscount={spaceDetails?.space.hourlyDiscount}
					weeklyDiscount={spaceDetails?.space.weeklyDiscount}
					dailyDiscount={spaceDetails?.space.dailyDiscount}
					monthlyDiscount={spaceDetails?.space.monthlyDiscount}
					amenities={spaceDetails?.space.amenities}
					availability={spaceDetails?.space.availability}
					spaceId={spaceDetails?.space._id}
				/>
			</div>
			{/* <FAQs /> */}
		</div>
	);
};

export default page;
