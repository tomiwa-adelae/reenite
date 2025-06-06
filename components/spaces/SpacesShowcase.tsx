"use client";
import React from "react";
import { motion } from "motion/react";
import { ImagesSlider } from "../ui/images-slider";

interface Props {
	images: any;
	title?: string;
	description?: string;
}

export const SpacesShowcase = ({ images, title, description }: Props) => {
	return (
		<ImagesSlider className="min-h-[80vh]" images={images}>
			<motion.div
				initial={{
					opacity: 0,
					y: -80,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.6,
				}}
				className="z-50 flex flex-col text-center text-white justify-center items-center container"
			>
				<h1
					style={{ fontFamily: "ClashDisplay" }}
					className="text-4xl lg:text-7xl mb-6 font-bold"
				>
					{title}
				</h1>
				{description && (
					<p className="text-base leading-relaxed font-medium mb-4 md:w-7/12 mx-auto">
						{description}
					</p>
				)}
			</motion.div>
		</ImagesSlider>
	);
};
