"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/constants";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname, useRouter } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";

export function MobileNavbar() {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state
	const pathname = usePathname();

	const isMobile = useIsMobile();

	const handleClick = () => {
		if (setOpenMobile) {
			setOpenMobile(false);
		}
	};

	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="hover:bg-transparent"
					size={"icon"}
				>
					<MenuIcon className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<div className="container">
					<div className="flex flex-1 flex-col overflow-x-hidden">
						<SheetClose asChild>
							<Link href="/" className="group">
								<Image
									src={"/assets/images/logo-full.svg"}
									alt="Reenite full logo in it's blue color"
									width={1000}
									height={1000}
									className="group-hover:hidden w-[150px] md:w-[160px] lg:w-[180px]"
								/>
								<Image
									src={"/assets/images/logo-full-grey.svg"}
									alt="Reenite full logo in it's grey color"
									width={1000}
									height={1000}
									className="hidden group-hover:block w-[150px] md:w-[160px] lg:w-[180px]"
								/>
							</Link>
						</SheetClose>
						<div className="mt-8 flex flex-col gap-4">
							{navLinks.map((link, idx) => {
								const isActive =
									pathname === link.slug ||
									pathname.startsWith(`${link.slug}/`);
								return (
									<Link
										key={idx}
										href={link.slug}
										className={`group flex items-center justify-start gap-2 group/sidebar py-2
                            ${
								isActive
									? "text-primary"
									: "text-black dark:text-white text-sm"
							} hover:text-primary
                            `}
										onClick={handleClick}
									>
										<span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 font-medium">
											{link.label}
										</span>
									</Link>
								);
							})}
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
