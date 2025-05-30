import React from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";

export const AppNavbar = () => {
	return (
		<div className="h-20 py-4 w-full border-b flex items-center justify-center bg-white dark:bg-black fixed top-0 left-0 z-50">
			<div className="container flex items-center justify-between">
				<Logo />
				<Button size={"md"} variant={"outline"}>
					Exit
				</Button>
			</div>
		</div>
	);
};
