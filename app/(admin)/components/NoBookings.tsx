import React from "react";
import Image from "next/image";

export const NoBookings = ({
	description = "You’ll find your bookings here after your customer have had their first booking on Reenite.",
}: {
	description?: string;
}) => {
	return (
		<div className="mt-4 flex flex-col items-center justify-center">
			<Image
				src={"/assets/icons/folder.svg"}
				alt="Folder icon"
				width={1000}
				height={1000}
				className="size-[250px] object-cover"
			/>
			<p className="text-muted-foreground text-center text-sm md:text-base mt-4 mb-6">
				{description}
			</p>
		</div>
	);
};
