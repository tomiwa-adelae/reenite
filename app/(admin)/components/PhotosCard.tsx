import React from "react";
import {
	DraggableCardBody,
	DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Image from "next/image";

export function PhotosCard() {
	return (
		<div className="grid grid-cols-3 pt-10 pb-8">
			<Image
				src={"/assets/images/space-one.jpg"}
				alt={"Space"}
				width={1000}
				height={1000}
				className="rounded-2xl aspect-square object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)] translate-x-10 -rotate-6"
			/>
			<Image
				src={"/assets/images/space-two.jpg"}
				alt={"Space"}
				width={1000}
				height={1000}
				className="rounded-2xl scale-125 aspect-square object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20"
			/>
			<Image
				src={"/assets/images/space-three.jpg"}
				alt={"Space"}
				width={1000}
				height={1000}
				className="rounded-2xl aspect-square object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)] -translate-x-10 rotate-6"
			/>
		</div>
	);
}
