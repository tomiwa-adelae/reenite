import React from "react";
import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
import { FAQs } from "@/components/shared/FAQs";
import { WorkSpaces } from "@/components/WorkSpaces";
import { firstMarquee, secondMarquee } from "@/constants";
import { Marquee } from "@/components/Marquee";
import { Testimonials } from "@/components/Testimonials";

const page = () => {
	const images = [
		"/assets/images/space-one.jpg",
		"/assets/images/space-two.jpg",
		"/assets/images/space-three.jpg",
		"/assets/images/space-four.jpg",
		"/assets/images/space-five.jpg",
	];
	return (
		<div>
			<SpacesShowcase
				images={images}
				title={"Find Your Perfect Workspace"}
				description={
					"Discover inspiring co-working spaces, private offices, and meeting rooms in your city. Book by the hour, day, or month."
				}
			/>
			<WorkSpaces />
			<Marquee texts={firstMarquee} />
			<FAQs />
			<Marquee texts={secondMarquee} />
			<Testimonials />
		</div>
	);
};

export default page;
