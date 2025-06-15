"use client";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { ISpace } from "@/lib/database/models/space.model";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SpaceActionModal } from "../SpaceActionModal";
import { cn } from "@/lib/utils";

export const SpacesGrid = ({
	spaces,
	userId,
}: {
	spaces: ISpace[];
	userId: string;
}) => {
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [selectedSpace, setSelectedSpace] = useState<ISpace | null>(null);
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{spaces.map((space: ISpace, index) => {
				const coverPhoto =
					// @ts-ignore
					space?.photos.find((photo) => photo.cover) ||
					// @ts-ignore
					space?.photos[0];
				return (
					<div
						className="group overflow-hidden relative"
						key={index}
						onClick={() => {
							if (space?.status === "active") {
								router.push(`/all-spaces/${space._id}`);
							} else {
								// Pop up to choose to continue working on the space or delete the space
								setOpenModal(true);
								setSelectedSpace(space);
							}
						}}
					>
						<Image
							src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
							alt={space.title || "Space image"}
							width={1000}
							height={1000}
							className={cn(
								"aspect-video lg:aspect-square rounded-lg transition-all group-hover:scale-105",
								coverPhoto && "object-cover"
							)}
						/>
						<h4 className="text-xl font-medium mt-4 hover:text-secondary transition-all line-clamp-1">
							{space.title ? (
								space?.title
							) : (
								<p className="italic">No title</p>
							)}
						</h4>
						<p className="text-base text-muted-foreground mt-1 break-words line-clamp-1">
							{!space?.city && (
								<p className="italic">No location</p>
							)}
							{space?.city}
							{space?.city && ","} {space?.state}
						</p>
						<Badge
							variant={
								space?.status === "active"
									? "success"
									: space?.status === "draft"
									? "warning"
									: space?.status === "hidden"
									? "destructive"
									: "default"
							}
							className="absolute top-3 left-2 capitalize"
						>
							{space.status}
						</Badge>
					</div>
				);
			})}
			{openModal && selectedSpace && (
				<SpaceActionModal
					open={openModal}
					closeModal={() => setOpenModal(false)}
					userId={userId}
					space={selectedSpace}
				/>
			)}
		</div>
	);
};
