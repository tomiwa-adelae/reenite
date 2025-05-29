import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import Link from "next/link";

export const AppNavbar = () => {
	return (
		<div className="h-20 py-4 w-full border-b flex items-center justify-center bg-white dark:bg-black fixed top-0 left-0 z-50">
			<div className="container flex items-center justify-between">
				<Logo />
				<div className="flex-1 w-full flex items-center justify-end gap-4">
					<Button
						asChild
						className="size-10"
						size={"icon"}
						variant={"ghost"}
					>
						<Link href="/profile">
							<Image
								src={"/assets/images/user-one.jpeg"}
								alt={`User picture`}
								width={1000}
								height={1000}
								className="size-full rounded-full cursor-pointer object-cover"
							/>
						</Link>
					</Button>
					<ProfileDropdown user={null} />
				</div>
			</div>
		</div>
	);
};
