"use client";
import React from "react";
import { motion } from "motion/react";
import { ImagesSlider } from "../ui/images-slider";
import { REENITE_LOGO } from "@/constants";

interface Props {
	image: any;
	title?: string;
	description?: string;
}

export const SpacesShowcase = ({ image, title, description }: Props) => {
	return (
		<div
			className="bg-scroll bg-no-repeat bg-cover bg-center min-h-[50vh] lg:min-h-[70vh] py-24 flex items-center justify-center relative"
			style={{
				backgroundImage: `url(/assets/images/spaces-showcase-img.jpg)`,
			}}
		>
			<div className="grid container h-full text-white">
				<div className="z-20">
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
						className="z-50 flex flex-col text-center text-white justify-center items-center"
					>
						<h1 className="text-4xl lg:text-7xl mb-4 font-bold">
							{title}
						</h1>
						{description && (
							<p className="text-base leading-relaxed font-medium mb-4 md:w-7/12 mx-auto">
								{description}
							</p>
						)}
					</motion.div>
				</div>
				{/* <div
					className={`absolute inset-0 ${
						title ? "bg-black/70" : "bg-black/20"
					}`}
				/> */}
			</div>
		</div>
	);
};
