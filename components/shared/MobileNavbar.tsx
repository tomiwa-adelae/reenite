"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/constants";
import { Menu, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";

export function MobileNavbar() {
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
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<div className="container">
					<div className="flex flex-1 flex-col overflow-x-hidden">
						<SheetClose asChild>
							<Logo />
						</SheetClose>
						<div className="mt-8 flex flex-col gap-1">
							<Link
								href={"/"}
								className={`group flex items-center justify-start gap-2 group/sidebar                             ${
									isActive("/") && "bg-[#F2F2F2]"
								} hover:bg-[#F2F2F2] p-4 rounded-lg
                            `}
								onClick={handleClick}
							>
								<span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 font-medium">
									Home
								</span>
							</Link>
							{navLinks.map(({ label, slug }, idx) => (
								<Link
									key={idx}
									href={slug}
									className={`group flex items-center justify-start gap-2 group/sidebar
                            ${
								isActive(slug) && "bg-[#F2F2F2]"
							} hover:bg-[#F2F2F2] p-4 rounded-lg
                            `}
									onClick={handleClick}
								>
									<span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 font-medium">
										{label}
									</span>
								</Link>
							))}
						</div>
						<div className="flex flex-col mt-4 w-full items-center justify-end gap-4">
							<Button
								asChild
								size="md"
								className="text-sm w-full"
							>
								<Link href="/book">Book a space</Link>
							</Button>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
