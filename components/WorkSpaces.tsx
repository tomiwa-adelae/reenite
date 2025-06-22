import Link from "next/link";
import Image from "next/image";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { ISpace } from "@/lib/database/models/space.model";

export const WorkSpaces = ({ spaces }: { spaces: ISpace[] }) => {
	return (
		<section className="bg-[#F1F1F1] py-16">
			<div className="container">
				<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-8">
					{spaces?.map((space, index) => {
						const coverPhoto =
							// @ts-ignore
							space?.photos.find((photo) => photo.cover) ||
							// @ts-ignore
							space?.photos[0];
						return (
							<Link
								key={index}
								// @ts-ignore
								href={`/spaces/${space?._id}`}
								className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white rounded-xl hover:bg-[#F7F7F7] transition-all text-center"
							>
								<Image
									src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
									// @ts-ignore
									alt={space?.category?.name || "Space icon"}
									width={1000}
									height={1000}
									className="aspect-video rounded-t-xl h-[200px]  object-cover"
								/>
								<div className="py-4 px-4 ">
									<h4 className="font-semibold text-lg text-secondary mt-1.5">
										{/* @ts-ignore */}
										{space?.title}
									</h4>
									<p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
										{space?.description}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
};
