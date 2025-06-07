import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { ISpace } from "@/lib/database/models/space.model";
import Image from "next/image";
import Link from "next/link";

export const SpacesGrid = ({ spaces }: { spaces: ISpace[] }) => {
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{spaces.map((space: ISpace, index) => {
				const coverPhoto =
					// @ts-ignore
					space?.photos.find((photo) => photo.cover) ||
					// @ts-ignore
					space?.photos[0];
				return (
					<Link
						className="group overflow-hidden rounded-2xl"
						href={`/all-spaces/${space?._id}`}
						key={index}
					>
						<Image
							src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
							alt={space.title || "Space image"}
							width={1000}
							height={1000}
							className="aspect-video lg:aspect-square object-cover rounded-2xl transition-all group-hover:scale-[105%]"
						/>
						<h4 className="text-xl font-medium mt-4">
							{space?.title}
						</h4>
						<p className="text-base text-muted-foreground mt-1">
							{space?.city}, {space?.state}
						</p>
					</Link>
				);
			})}
		</div>
	);
};
