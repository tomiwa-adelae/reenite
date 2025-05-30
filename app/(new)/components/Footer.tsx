import { Button } from "@/components/ui/button";
import React from "react";

export const Footer = ({ children }: { children: React.ReactNode }) => {
	const year = new Date().getFullYear();
	return (
		<footer className="border-t fixed w-full bottom-0 py-4 h-20 flex items-center justify-center z-40 bg-white">
			{children}
		</footer>
	);
};
