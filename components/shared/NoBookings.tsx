import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const NoBookings = () => {
	return (
		<div className="mt-4 flex flex-col items-center justify-center">
			<Image
				src={"/assets/icons/folder.svg"}
				alt="Folder icon"
				width={1000}
				height={1000}
				className="size-[250px] object-cover"
			/>
			<p className="text-muted-foreground text-base mt-4 mb-6">
				You’ll find your past bookings here after you’ve had your first
				booking on Reenite.
			</p>
			<Button asChild size="md" variant="secondary">
				<Link href="/spaces">Book a space</Link>
			</Button>
		</div>
	);
};
