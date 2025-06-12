import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const SpaceNotFound = () => {
	return (
		<div className="py-16 min-h-[80vh] flex flex-col items-center justify-center space-y-4">
			<h1 className="font-bold text-7xl md:text-8xl lg:text-9xl text-primary">
				404
			</h1>
			<p className="text-base">Space not found.</p>
			<Button asChild size="lg" variant="secondary">
				<Link href="/">Go back home</Link>
			</Button>
		</div>
	);
};

export default SpaceNotFound;
