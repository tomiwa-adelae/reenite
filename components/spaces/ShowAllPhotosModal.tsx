"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { IPhoto } from "@/lib/database/models/space.model";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Image from "next/image";
import { DEFAULT_SPACE_IMAGE } from "@/constants";

interface Props {
	open: boolean;
	closeModal?: () => void;
	photos: any;
}

export const ShowAllPhotosModal = ({ open, photos, closeModal }: Props) => {
	const [openLightBox, setOpenLightBox] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpenLightBox(true);
	};

	return (
		<>
			<Drawer
				open={open}
				onOpenChange={() => !openLightBox && closeModal?.()}
			>
				<DrawerContent className="h-[90vh]">
					<ScrollArea className="h-[90vh]">
						<div className="container pt-4">
							<div className="border-b pb-4 md:block">
								<p className="font-semibold text-lg">
									All photos
								</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-32 md:mb-40 mt-4">
								{photos?.map((photo: any, index: string) => (
									<div
										className="relative group overflow-hidden"
										key={index}
										onClick={() =>
											handleOpen(Number(index))
										}
									>
										<Image
											src={
												photo?.src ||
												DEFAULT_SPACE_IMAGE
											}
											alt="Main space image"
											width={1000}
											height={1000}
											className="aspect-auto rounded-lg size-full object-cover transition-all"
										/>
										<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer rounded-lg" />
									</div>
								))}
							</div>
						</div>
					</ScrollArea>
				</DrawerContent>
			</Drawer>
			{openLightBox && (
				<Lightbox
					open={openLightBox}
					close={() => setOpenLightBox(false)}
					slides={photos}
					index={currentIndex}
				/>
			)}
		</>
	);
};
