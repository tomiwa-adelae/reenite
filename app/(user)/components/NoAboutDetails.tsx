import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NoAboutDetails = () => {
	return (
		<div className="flex flex-col items-start justify-center">
			<h4 className="font-medium text-lg lg:text-xl">
				Complete your profile
			</h4>
			<p className="text-base lg:text-base text-muted-foreground mt-1 mb-4">
				Your Reenite profile is an important part of every reservation.
				Complete yours to help us serve you better.
			</p>
			<Button asChild size="md" variant={"secondary"}>
				<Link href="/about/edit">Get started</Link>
			</Button>
		</div>
	);
};
