"use client";
import React from "react";
import { userNavLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const sidebarLinks = [
	{
		slug: "/about",
		label: "About me",
		icon: "/assets/images/user-one.jpeg",
		exact: "/about",
	},
	{
		slug: "/bookings",
		label: "Past bookings",
		icon: "/assets/icons/folder.svg",
		exact: "/bookings",
	},
	{
		slug: "/spaces",
		label: "Explore spaces",
		icon: "/assets/icons/explore.svg",
	},
];

export const Sidebar = () => {
	const pathname = usePathname();

	const isActive = (slug: string) =>
		pathname === slug || pathname.startsWith(`${slug}/`);

	return (
		<div className="hidden lg:flex fixed left-0 top-20 w-96 border-r h-screen">
			<div className="container py-8">
				<div className="container">
					<div className="container">
						<div className="container">
							<h2 className="font-bold text-3xl">Profile</h2>
							<div className="mt-8 grid gap-1">
								{sidebarLinks.map(
									({ slug, label, icon, exact }) => (
										<Link
											key={slug}
											href={slug}
											className={cn(
												"p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-[#F2F2F2]",
												isActive(exact || slug) &&
													"bg-[#F2F2F2]"
											)}
										>
											<Image
												src={icon}
												alt={`${label} icon`}
												width={40}
												height={40}
												className="size-10 rounded-full object-cover"
											/>
											<h5 className="text-lg font-medium">
												{label}
											</h5>
										</Link>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
