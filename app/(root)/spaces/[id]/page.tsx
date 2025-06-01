import { SpaceImages } from "@/components/spaces/SpaceImages";
import { AboutSpace } from "@/components/spaces/AboutSpace";
import { SpaceBooking } from "@/components/spaces/SpaceBooking";
import { SpaceAmenities } from "@/components/spaces/SpaceAmenities";
import { SpaceContactInfo } from "@/components/spaces/SpaceContactInfo";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Separator } from "@/components/ui/separator";

const page = () => {
	const images = [
		{ src: "/assets/images/space-one.jpg" },
		{ src: "/assets/images/space-two.jpg" },
		{ src: "/assets/images/space-three.jpg" },
		{ src: "/assets/images/space-four.jpg" },
		{ src: "/assets/images/space-five.jpg" },
		{ src: "/assets/images/space-five.jpg" },
	];
	return (
		<div className="relative pt-8 pb-16">
			<div className="container">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					Mini Conference Room
				</h2>
				<p className="text-sm lg:text-base text-muted-foreground mt-2">
					300 Adeola Odeku St, Victoria Island, Lagos 101241, Lagos
				</p>
				<SpaceImages images={images} />
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
					<div className="col-span-4">
						<AboutSpace />
						<Separator className="my-8" />
						<SpaceBooking />
						<Separator className="mt-4 mb-8" />
						<SpaceAmenities />
						<Separator className="my-8" />
						<SpaceContactInfo />
					</div>
					<div className="col-span-6 lg:col-span-2">
						<div className="sticky top-25 rounded-2xl p-4 lg:p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
							<h4 className="text-xl md:text-2xl font-medium">
								Booking details
							</h4>
							<p className="text-sm lg:text-base text-muted-foreground mb-4">
								You selected: Monthly plan
							</p>
							<ReservationForm />
						</div>
					</div>
				</div>
			</div>
			{/* <FAQs /> */}
		</div>
	);
};

export default page;
