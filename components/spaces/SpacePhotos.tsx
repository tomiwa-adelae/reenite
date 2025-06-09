"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Grip } from "lucide-react";
import { Button } from "../ui/button";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { ShowAllPhotosModal } from "./ShowAllPhotosModal";

export const SpacePhotos = ({ photos }: { photos: any }) => {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [openAllPhotosModal, setOpenAllPhotosModal] = useState(false);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const coverPhoto =
		// @ts-ignore
		photos.find((photo) => photo.cover) ||
		// @ts-ignore
		space?.photos[0];

	return (
		<div className="mt-4 relative">
			<div className="grid grid-cols-1 md:grid-cols-5 grid-rows-4 gap-2 rounded-2xl overflow-hidden">
				{/* Large main image */}
				<div
					className="relative col-span-3 row-span-4 group overflow-hidden"
					onClick={() => handleOpen(0)}
				>
					<Image
						src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
						alt="Main space image"
						width={1000}
						height={1000}
						className="aspect-square md:aspect-video size-full object-cover transition-all group-hover:scale-105"
					/>
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>

				{/* Side photos — use optional chaining to avoid crashes */}
				<div
					className="relative hidden md:block row-span-2 col-start-4 group"
					onClick={() => handleOpen(1)}
				>
					{photos[1] && (
						<Image
							src={photos[1].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-105"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
				<div
					className="relative hidden md:block row-span-2 col-start-4 row-start-3 group"
					onClick={() => handleOpen(2)}
				>
					{photos[2] && (
						<Image
							src={photos[2].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-105"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
				<div
					className="relative hidden md:block row-span-2 col-start-5 row-start-1 group"
					onClick={() => handleOpen(3)}
				>
					{photos[3] && (
						<Image
							src={photos[3].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-105"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
				<div
					className="hidden relative md:block row-span-2 col-start-5 row-start-3 group"
					onClick={() => handleOpen(4)}
				>
					{photos[4] && (
						<Image
							src={photos[4].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-105"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
			</div>
			{photos.length > 5 && (
				<Button
					className="absolute bottom-2 right-2"
					variant={"white"}
					size={"md"}
					onClick={() => setOpenAllPhotosModal(true)}
				>
					<Grip /> Show all photos
				</Button>
			)}
			<Button
				className="md:hidden absolute bottom-2 right-2"
				variant={"white"}
				size={"md"}
				onClick={() => setOpenAllPhotosModal(true)}
			>
				<Grip /> Show all photos
			</Button>
			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={photos}
					index={currentIndex}
				/>
			)}
			{openAllPhotosModal && (
				<ShowAllPhotosModal
					open={openAllPhotosModal}
					closeModal={() => setOpenAllPhotosModal(false)}
					photos={photos}
				/>
			)}
		</div>
	);
};
