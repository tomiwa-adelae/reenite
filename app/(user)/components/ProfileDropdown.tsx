"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutPanelLeft, LogOut, Menu, Settings } from "lucide-react";
import { DEFAULT_PROFILE_PICTURE, userNavLinks } from "@/constants";
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
import { IUser } from "@/lib/database/models/user.model";
import { useClerk } from "@clerk/nextjs";

interface Props {
	user: any;
}

export function ProfileDropdown({ user }: Props) {
	const router = useRouter();
	const { signOut } = useClerk();

	const handleLogout = async () => {
		await signOut();
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
					{user ? (
						<Image
							src={user?.picture || DEFAULT_PROFILE_PICTURE}
							alt={
								`${user?.firstName}'s picture` ||
								"User profile picture"
							}
							width={1000}
							height={1000}
							className="size-10 rounded-full cursor-pointer object-cover"
						/>
					) : (
						<Menu />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-80 py-1 text-base font-medium"
			>
				{user?.isAdmin && (
					<Link href="/dashboard">
						<DropdownMenuItem className="cursor-pointer">
							<LayoutPanelLeft className="size-5" />
							<span>Admin panel</span>
						</DropdownMenuItem>
					</Link>
				)}
				{userNavLinks.map(({ label, icon, slug }, index) => {
					const Icon = icon;
					return (
						<Link key={index} href={slug}>
							<DropdownMenuItem className="cursor-pointer">
								<Icon className="size-5" />
								<span>{label}</span>
							</DropdownMenuItem>
						</Link>
					);
				})}
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer text-base font-medium"
				>
					<LogOut className="size-5" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
