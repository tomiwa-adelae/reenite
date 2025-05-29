"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, Menu, Settings } from "lucide-react";
import { userNavLinks } from "@/constants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ProfileDropdown({ user }: { user?: any }) {
	const router = useRouter();

	const handleLogout = async () => {
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant={"outline"}
					className="bg-[#F5F4F7] size-10"
				>
					<Menu />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 py-2">
				{userNavLinks.map(({ label, icon, slug }, index) => {
					const Icon = icon;
					return (
						<Link href={slug}>
							<DropdownMenuItem className="cursor-pointer">
								<Icon className="size-5" />
								<span className="text-base font-medium">
									{label}
								</span>
							</DropdownMenuItem>
						</Link>
					);
				})}
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer"
				>
					<LogOut className="size-5" />
					<span className="uppercase text-xs font-medium">
						Logout
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
