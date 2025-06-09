import Image from "next/image";
import { IPhoto } from "@/lib/database/models/space.model";
import { cn } from "@/lib/utils";
import { DEFAULT_SPACE_IMAGE } from "@/constants";

export function PhotosCard({ photos }: { photos: IPhoto[] }) {
	return (
		<div className="grid grid-cols-3 pt-10 pb-8">
			{photos.slice(0, 3).map((photo, index) => (
				<Image
					key={index}
					src={photo.src || DEFAULT_SPACE_IMAGE}
					alt={"Space"}
					width={1000}
					height={1000}
					className={cn(
						"rounded-lg aspect-square transition-all object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
						index === 0 &&
							"translate-x-10 -rotate-6 hover:scale-105",
						index === 1 && "z-20 scale-125 hover:scale-105",
						index === 2 &&
							"-translate-x-10 rotate-6 hover:scale-105"
					)}
				/>
			))}
		</div>
	);
}
