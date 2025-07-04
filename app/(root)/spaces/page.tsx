// import React from "react";
// import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
// import { FAQs } from "@/components/shared/FAQs";
// import { WorkSpaces } from "@/components/WorkSpaces";
// import {
// 	firstMarquee,
// 	REENITE_EMAIL_ADDRESS,
// 	REENITE_LOGO,
// 	secondMarquee,
// } from "@/constants";
// import { Marquee } from "@/components/Marquee";
// import { Testimonials } from "@/components/Testimonials";
// import { getSpaces } from "@/lib/actions/customer/space.actions";

// import type { Metadata } from "next";
// import { NoSpaces } from "@/app/(admin)/components/NoSpaces";
// export const metadata: Metadata = {
// 	title: "Our spaces - Reenite",
// 	description:
// 		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
// 	keywords: "Reenite, spaces, space, our spaces, all spaces",
// };

// const page = async () => {
// 	const spaces = await getSpaces();

// 	if (spaces?.spaces?.length === 0 || spaces === undefined)
// 		return (
// 			<div className="min-h-[80vh] flex items-center justify-center">
// 				<NoSpaces
// 					description={
// 						<>
// 							There are no spaces yet. Come back another time or
// 							contact{" "}
// 							<a
// 								href={`mailto:${REENITE_EMAIL_ADDRESS}`}
// 								className="underline text-secondary hover:font-medium transition-all"
// 							>
// 								{REENITE_EMAIL_ADDRESS}
// 							</a>
// 						</>
// 					}
// 					showButton={false}
// 				/>
// 			</div>
// 		);

// 	const allPhotoUrls = spaces?.spaces?.flatMap((space: any) =>
// 		space?.photos?.map((photo: any) => photo?.src)
// 	);

// 	return (
// 		<div>
// 			<SpacesShowcase
// 				image={
// 					spaces?.spaces[0]?.photos[0]?.src
// 						? spaces?.spaces[0]?.photos[0]?.src
// 						: REENITE_LOGO
// 				}
// 				title={"Book A Space at Reenite"}
// 				// description={
// 				// 	"Discover inspiring co-working spaces, private offices, and meeting rooms in your city. Book by the hour, day, or month."
// 				// }
// 			/>
// 			<WorkSpaces spaces={spaces?.spaces} />
// 			<Marquee texts={firstMarquee} />
// 			<FAQs />
// 			{/*<Marquee texts={secondMarquee} />
// 			<Testimonials /> */}
// 		</div>
// 	);
// };

// export default page;

import { getSpaces } from "@/lib/actions/customer/space.actions";
import Image from "next/image";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dot } from "lucide-react";
import { ReeniteMap } from "@/components/ReeniteMap";

const page = async () => {
	const spaces = await getSpaces();
	return (
		<div className="pt-8 pb-16">
			<div className="container">
				<h1 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					Find a location
				</h1>
				<div className="grid mt-4 grid-cols-1 lg:grid-cols-5 gap-8">
					<div className="grid gap-4 lg:col-span-3">
						{spaces?.spaces.map((space: any, index: string) => {
							const coverPhoto =
								// @ts-ignore
								space?.photos.find((photo) => photo.cover) ||
								// @ts-ignore
								space?.photos[0];
							return (
								<div
									className="border overflow-hidden rounded-lg border-border grid gap-4 grid-cols-5 lg:grid-cols-7 group"
									key={index}
								>
									<div className="col-span-2">
										<Image
											src={
												coverPhoto?.src ||
												DEFAULT_SPACE_IMAGE
											}
											alt={space.title || "Space pho"}
											width={1000}
											height={1000}
											className="object-cover aspect-square size-full"
										/>
									</div>
									<div className="col-span-3 lg:col-span-5 py-6 md:py-8 lg:py-10 h-full flex flex-col lg:flex-row items-start lg:items-center justify-center gap-4 pr-4">
										<div className="space-y-1">
											<Link
												href={space._id}
												className="font-medium text-lg group-hover:text-secondary hover:underline"
											>
												{space.title}
											</Link>
											<p className="text-sm text-muted-foreground line-clamp-3">
												Amenities:{" "}
												{space.amenities?.map(
													(
														amenity: any,
														index: number
													) => (
														<span
															key={index}
															className=""
														>
															{index !== 0 && (
																<Dot className="size-4 inline-block" />
															)}
															{amenity.name}
														</span>
													)
												)}
											</p>
										</div>
										<Button
											size={"md"}
											asChild
											variant={"outline"}
											className="w-full md:w-auto"
										>
											<Link href={`/spaces/${space._id}`}>
												Book a space
											</Link>
										</Button>
									</div>
								</div>
							);
						})}
					</div>
					<div className="lg:col-span-2">
						<ReeniteMap />
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
