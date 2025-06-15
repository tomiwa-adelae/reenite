"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ISpace } from "@/lib/database/models/space.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { SpaceActionModal } from "./SpaceActionModal";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const SpacesLists = ({
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
		<div className="md:hidden">
			{spaces.map((space, index) => {
				const coverPhoto =
					// @ts-ignore
					space?.photos.find((photo) => photo.cover) ||
					// @ts-ignore
					space?.photos[0];
				return (
					<div
						key={index}
						className="hover:bg-[#F7F7F7] transition-all p-2 rounded-lg flex items-center justify-start gap-4 group cursor-pointer relative"
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
								"size-[70px] mx-auto rounded-lg",
								coverPhoto && "object-cover"
							)}
						/>
						<div className="flex-1 flex items-center justify-between gap-2">
							<div className="flex-1">
								<h5 className="text-base font-medium line-clamp-1">
									{space.title ? (
										space?.title
									) : (
										<p className="italic">No title</p>
									)}
								</h5>
								<p className="text-sm text-muted-foreground">
									{space.city}, {space.state}
								</p>
							</div>
							<Button variant={"ghost"} size="icon">
								<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
							</Button>
						</div>
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
							className="absolute top-3 left-3 capitalize px-1 py-1 rounded-full"
						/>
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
