"use client";
import Image from "next/image";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export const ImageLibrary = () => {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpen = (index: number) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	const galleryImages = [
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307822/innovation/DSC_1108_uetvgq.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744725668/innovation/WhatsApp_Image_2025-04-14_at_7.45.51_PM_ucve3u.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307877/innovation/DSC_1269_uerpo3.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307914/innovation/DSC_1057_hi7z5t.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307925/innovation/DSC_1062_q7cxbv.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744308380/innovation/IMG-20250410-WA0063_xvqpfu.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744308382/innovation/DSC_1065_pp4qio.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744308689/innovation/DSC_1383-Joe_Photography_ulwvwy.jpg",
		},
		{
			src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744725767/innovation/WhatsApp_Image_2025-04-14_at_6.30.48_PM_c8cjl9.jpg",
		},
	];

	return (
		<div>
			<div className="container">
				<h4 className="font-semibold text-3xl lg:text-5xl text-center">
					Our photo{" "}
					<span className="text-muted-foreground">Gallery</span>
				</h4>
				<div
					className={`mt-8 grid grid-cols-2 lg:grid-cols-3 gap-0.5 sm:gap-2 lg:gap-4`}
				>
					{galleryImages?.map((image: any, index: number) => (
						<div
							className="relative"
							key={index}
							onClick={() => handleOpen(index)}
						>
							<Image
								src={image.src}
								width={1000}
								height={1000}
								alt={`Image ${index + 1}`}
								className="cursor-pointer rounded-lg aspect-square object-cover"
							/>
							<div className="absolute inset-0 transition-all hover:bg-black/20 cursor-pointer rounded-lg" />
						</div>
					))}
				</div>
				{open && (
					<Lightbox
						open={open}
						close={() => setOpen(false)}
						slides={galleryImages}
						index={currentIndex}
					/>
				)}
			</div>
		</div>
	);
};
