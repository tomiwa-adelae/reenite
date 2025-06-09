import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export const NoBookings = ({
	description = "You’ll find your past bookings here after you’ve had your first booking on Reenite.",
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
				className="size-[200px] lg:size-[250px] object-cover"
			/>
			<p className="text-muted-foreground text-center text-sm md:text-base mt-4 mb-6">
				{description}
			</p>
			<Button asChild size="md" variant="secondary">
				<Link href="/spaces">Book a space</Link>
			</Button>
		</div>
	);
};
