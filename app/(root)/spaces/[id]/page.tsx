import { SpaceImages } from "@/components/spaces/SpaceImages";
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

const page = async ({ params }: { params: any }) => {
	const { id } = await params;
	const images = [
		{ src: "/assets/images/space-one.jpg" },
		{ src: "/assets/images/space-two.jpg" },
		{ src: "/assets/images/space-three.jpg" },
		{ src: "/assets/images/space-four.jpg" },
		{ src: "/assets/images/space-five.jpg" },
		{ src: "/assets/images/space-five.jpg" },
	];

	const spaceDetails = await getSpaceDetails(id);

	if (spaceDetails?.status === 400) return <SpaceNotFound />;

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
				<SpaceImages images={spaceDetails?.space.photos} />
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
