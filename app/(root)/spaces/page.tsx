import React from "react";
import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
import { FAQs } from "@/components/shared/FAQs";
import { WorkSpaces } from "@/components/WorkSpaces";
import { firstMarquee, secondMarquee } from "@/constants";
import { Marquee } from "@/components/Marquee";
import { Testimonials } from "@/components/Testimonials";
import { getSpaces } from "@/lib/actions/customer/space.actions";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Our spaces - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

const page = async () => {
	const spaces = await getSpaces();

	const allPhotoUrls = spaces?.spaces?.flatMap((space: any) =>
		space?.photos?.map((photo: any) => photo?.src)
	);

	return (
		<div>
			<SpacesShowcase
				images={allPhotoUrls}
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
