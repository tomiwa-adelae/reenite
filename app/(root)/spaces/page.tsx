import React from "react";
import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
import { FAQs } from "@/components/shared/FAQs";
import { WorkSpaces } from "@/components/WorkSpaces";
import {
	firstMarquee,
	REENITE_EMAIL_ADDRESS,
	REENITE_LOGO,
	secondMarquee,
} from "@/constants";
import { Marquee } from "@/components/Marquee";
import { Testimonials } from "@/components/Testimonials";
import { getSpaces } from "@/lib/actions/customer/space.actions";

import type { Metadata } from "next";
import { NoSpaces } from "@/app/(admin)/components/NoSpaces";
export const metadata: Metadata = {
	title: "Our spaces - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

const page = async () => {
	const spaces = await getSpaces();

	if (spaces?.spaces?.length === 0 || spaces === undefined)
		return (
			<div className="min-h-[80vh] flex items-center justify-center">
				<NoSpaces
					description={
						<>
							There are no spaces yet. Come back another time or
							contact{" "}
							<a
								href={`mailto:${REENITE_EMAIL_ADDRESS}`}
								className="underline text-secondary hover:font-medium transition-all"
							>
								{REENITE_EMAIL_ADDRESS}
							</a>
						</>
					}
					showButton={false}
				/>
			</div>
		);

	const allPhotoUrls = spaces?.spaces?.flatMap((space: any) =>
		space?.photos?.map((photo: any) => photo?.src)
	);

	return (
		<div>
			<SpacesShowcase
				image={
					spaces?.spaces[0]?.photos[0]?.src
						? spaces?.spaces[0]?.photos[0]?.src
						: REENITE_LOGO
				}
				title={"Find Your Perfect Workspace"}
				description={
					"Discover inspiring co-working spaces, private offices, and meeting rooms in your city. Book by the hour, day, or month."
				}
			/>
			<WorkSpaces spaces={spaces?.spaces} />
			<Marquee texts={firstMarquee} />
			<FAQs />
			{/*<Marquee texts={secondMarquee} />
			<Testimonials /> */}
		</div>
	);
};

export default page;
