import Link from "next/link";
import Image from "next/image";
// import { spaces } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { MoveRight } from "lucide-react";
import { ISpace } from "@/lib/database/models/space.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";

export const ExploreSpaces = ({ spaces }: { spaces: ISpace[] }) => {
	return (
		<div className="bg-white pt-10 pb-16">
			<div className="container">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl text-center">
					Explore our{" "}
					<span className="text-muted-foreground">spaces</span>
				</h2>
				<ScrollArea>
					<div className="flex w-max space-x-4 pr-10 pb-4 mt-8">
						{spaces?.map((space, index) => {
							const coverPhoto =
								// @ts-ignore
								space?.photos.find((photo) => photo.cover) ||
								// @ts-ignore
								space?.photos[0];
							return (
								<Link
									href={`/spaces/${space?._id}`}
									key={index}
									className="relative group overflow-hidden rounded-2xl"
								>
									<Image
										src={
											coverPhoto?.src ||
											DEFAULT_SPACE_IMAGE
										}
										alt={space.title || "Space image"}
										width={1000}
										height={1000}
										className="w-auto h-[300px] object-cover rounded-xl"
									/>
									<h4 className="text-xl font-medium mt-4">
										{space?.title}
									</h4>
									<p className="text-base text-muted-foreground mt-1 truncate mb-4">
										{space?.description ||
											`${space.city}, ${space?.state}`}
									</p>
									<Button asChild size="md">
										<Link href={`/spaces/${space?._id}`}>
											Book space
										</Link>
									</Button>
								</Link>
							);
						})}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<div className="flex items-center justify-center mt-4">
					<Button asChild size="lg" variant="secondary">
						<Link href="/spaces">Book a space today</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
