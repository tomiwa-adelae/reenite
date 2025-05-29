import React from "react";
import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
import { FAQs } from "@/components/shared/FAQs";
import { WorkSpaces } from "@/components/WorkSpaces";

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
			<FAQs />
		</div>
	);
};

export default page;
