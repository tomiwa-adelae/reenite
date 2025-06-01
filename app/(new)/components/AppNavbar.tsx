import React from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";

export const AppNavbar = () => {
	return (
		<div className="h-20 py-4 w-full border-b flex items-center justify-center bg-white dark:bg-black fixed top-0 left-0 z-50">
			<div className="container flex items-center justify-between">
				<Logo />
				<Button asChild size={"md"} variant={"outline"}>
					<Link href="/all-spaces">Exit</Link>
				</Button>
			</div>
		</div>
	);
};
