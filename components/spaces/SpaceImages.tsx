"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Grip } from "lucide-react";
import { Button } from "../ui/button";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export const SpaceImages = ({ images }: { images: any }) => {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};
	return (
		<div className="mt-4 relative">
			<div className="grid grid-cols-1 md:grid-cols-5 grid-rows-4 gap-2 rounded-lg overflow-hidden">
				{/* Large main image */}
				<div
					className="relative col-span-3 row-span-4 group overflow-hidden"
					onClick={() => handleOpen(0)}
				>
					<Image
						src={images[0].src}
						alt="Main space image"
						width={1000}
						height={1000}
						className="aspect-square md:aspect-video size-full object-cover transition-all group-hover:scale-[101%]"
					/>
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>

				{/* Side images — use optional chaining to avoid crashes */}
				<div
					className="relative hidden md:block row-span-2 col-start-4 group"
					onClick={() => handleOpen(1)}
				>
					{images[1] && (
						<Image
							src={images[1].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-[101%]"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
				<div
					className="relative hidden md:block row-span-2 col-start-4 row-start-3 group"
					onClick={() => handleOpen(2)}
				>
					{images[2] && (
						<Image
							src={images[2].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-[101%]"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
				<div
					className="relative hidden md:block row-span-2 col-start-5 row-start-1 group"
					onClick={() => handleOpen(3)}
				>
					{images[3] && (
						<Image
							src={images[3].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-[101%]"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
				<div
					className="hidden relative md:block row-span-2 col-start-5 row-start-3 group"
					onClick={() => handleOpen(4)}
				>
					{images[4] && (
						<Image
							src={images[4].src}
							alt="Secondary image"
							width={1000}
							height={1000}
							className="aspect-video size-full object-cover transition-all group-hover:scale-[101%]"
						/>
					)}
					<div className="absolute opacity-0 group-hover:opacity-100 inset-0 transition-all group-hover:bg-black/20 cursor-pointer" />
				</div>
			</div>
			{images.length > 5 && (
				<Button
					className="absolute bottom-2 right-2"
					variant={"white"}
					size={"md"}
				>
					<Grip /> Show all photos
				</Button>
			)}
			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={images}
					index={currentIndex}
				/>
			)}
		</div>
	);
};
