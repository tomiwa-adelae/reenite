import { Button } from "@/components/ui/button";
import React from "react";

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="border-t fixed w-full bottom-0 py-4 h-20 flex items-center justify-center z-40 bg-white">
			<div className="container flex items-center justify-between gap-4">
				<p className="text-base text-muted-foreground">
					&copy; {year} Reenite. All rights reserved.
				</p>
				<Button size="lg">Done</Button>
			</div>
		</footer>
	);
};
