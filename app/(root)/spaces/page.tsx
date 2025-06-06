import React from "react";
import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
import { FAQs } from "@/components/shared/FAQs";
import { WorkSpaces } from "@/components/WorkSpaces";
import { firstMarquee, secondMarquee } from "@/constants";
import { Marquee } from "@/components/Marquee";
import { Testimonials } from "@/components/Testimonials";
import { getSpaces } from "@/lib/actions/customer/space.actions";

const page = async () => {
	const images = [
		"/assets/images/space-one.jpg",
		"/assets/images/space-two.jpg",
		"/assets/images/space-three.jpg",
		"/assets/images/space-four.jpg",
		"/assets/images/space-five.jpg",
	];

	const spaces = await getSpaces();

	return (
		<div>
			<SpacesShowcase
				images={images}
				title={"Find Your Perfect Workspace"}
				description={
					"Discover inspiring co-working spaces, private offices, and meeting rooms in your city. Book by the hour, day, or month."
				}
			/>
			<WorkSpaces spaces={spaces?.spaces} />
			<Marquee texts={firstMarquee} />
			<FAQs />
			<Marquee texts={secondMarquee} />
			<Testimonials />
		</div>
	);
};

export default page;
