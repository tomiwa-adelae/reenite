"use client";
import Image from "next/image";
import { useState } from "react";
import { spaces } from "@/constants";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export const ImageLibrary = () => {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};
	return (
		<div className="pb-16">
			<div className="container">
				<h4 className="font-medium text-2xl md:text-3xl lg:text-4xl text-center">
					Our photo{" "}
					<span className="text-muted-foreground">Gallery</span>
				</h4>
				<div
					className={`mt-8 grid grid-cols-2 lg:grid-cols-3 gap-0.5 sm:gap-2 lg:gap-4`}
				>
					{spaces?.map((image: any, index: number) => (
						<div
							className="relative group overflow-hidden rounded-4xl"
							key={index}
							onClick={() => handleOpen(index)}
						>
							<Image
								src={image.src}
								width={1000}
								height={1000}
								alt={`Image ${index + 1}`}
								className="cursor-pointer rounded-lg aspect-square object-cover group-hover:scale-105 transition-all"
							/>
							<h3 className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] opacity-0 group-hover:opacity-100 transition-all z-20 font-medium text-xl text-center text-white">
								{image.name}
							</h3>
							<div className="absolute inset-0 transition-all hover:bg-black/20 cursor-pointer rounded-lg" />
						</div>
					))}
				</div>
				{open && (
					<Lightbox
						open={open}
						close={() => setOpen(false)}
						slides={spaces}
						index={currentIndex}
					/>
				)}
			</div>
		</div>
	);
};
