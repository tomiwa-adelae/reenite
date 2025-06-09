import Image from "next/image";
import { Button } from "./ui/button";
import { DEFAULT_SPACE_IMAGE, spaces } from "@/constants";
import Link from "next/link";
import { ISpace } from "@/lib/database/models/space.model";

export const WorkSpaces = ({ spaces }: { spaces: ISpace[] }) => {
	return (
		<section className="bg-white py-16">
			<div className="container">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl text-center">
					Redefining the Future{" "}
					<span className="text-muted-foreground">of Workspaces</span>
				</h2>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
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
								className="relative group overflow-hidden rounded-lg"
							>
								<Image
									src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
									alt={space.title || "Space image"}
									width={1000}
									height={1000}
									className="aspect-video md:aspect-square object-cover rounded-xl"
								/>
								<h4 className="text-xl font-medium mt-4 group-hover:text-secondary transition-all">
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
			</div>

			{/* <div className="mt-8">
				{workspaces.map((space, index) => (
					<div
						key={index}
						className="grid grid-cols-1 md:grid-cols-2"
					>
						<div
							className={`${
								space.bg
							} py-16 text-white flex items-start justify-center ${
								index % 2 === 1
									? "order-1 md:order-2"
									: "order-1"
							}`}
						>
							<div className="container h-full flex flex-col items-start justify-center">
								<h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">
									{space.title}
								</h2>
								<p className="text-sm lg:text-base mt-3">
									{space.description}
								</p>
								<p className="text-sm lg:text-base mt-2 mb-6">
									Amenities: {space.amenities}
								</p>
								<Button size="lg" variant={space.buttonVariant}>
									Book Now
								</Button>
							</div>
						</div>
						<Image
							src={space.image}
							alt={space.title}
							width={1000}
							height={1000}
							className={`aspect-square object-cover ${
								index % 2 === 1
									? "order-2 md:order-1"
									: "order-2"
							}`}
						/>
					</div>
				))}
			</div> */}
		</section>
	);
};
