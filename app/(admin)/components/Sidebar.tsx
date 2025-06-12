"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { adminMobileLinks, adminNavLinks, navLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = () => {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state
	const pathname = usePathname();

	const handleClick = () => {
		if (setOpenMobile) {
			setOpenMobile(false);
		}
	};

	const isActive = (slug: string) =>
		pathname === slug || pathname.startsWith(`${slug}/`);

	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="bg-[#F5F4F7] size-10"
					size={"icon"}
				>
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<ScrollArea className="h-screen">
					<div className="container pb-20">
						<div className="flex flex-1 flex-col overflow-x-hidden">
							<SheetClose asChild>
								<Logo />
							</SheetClose>
							<div className="mt-8 flex flex-col gap-1">
								{adminMobileLinks.map(
									({ label, slug, icon }, idx) => {
										const Icon = icon;
										return (
											<Link
												key={idx}
												href={slug}
												className={`group flex items-center justify-start gap-2 group/sidebar
											${isActive(slug) && "bg-[#F2F2F2]"} hover:bg-[#F2F2F2] p-4 rounded-lg
								`}
												onClick={handleClick}
											>
												<Icon className="size-5" />

												<h5 className="text-base font-medium">
													{label}
												</h5>
											</Link>
										);
									}
								)}
							</div>
							<Separator className="my-4" />
							<div className="flex flex-col gap-1">
								{navLinks.map(({ label, slug }, idx) => {
									return (
										<Link
											key={idx}
											href={slug}
											className={`group flex items-center justify-start gap-2 group/sidebar
										${isActive(slug) && "bg-[#F2F2F2]"} hover:bg-[#F2F2F2] p-4 rounded-lg
											`}
											onClick={handleClick}
										>
											<h5 className="text-base font-medium">
												{label}
											</h5>
										</Link>
									);
								})}
							</div>
							{/* <div className="flex flex-col mt-4 w-full items-center justify-end gap-4">
							<Button
							asChild
							size="md"
							className="text-sm w-full"
							>
							<Link href="/book">Book a space</Link>
							</Button>
							</div> */}
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};
