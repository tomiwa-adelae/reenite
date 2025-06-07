import { Logo } from "@/components/shared/Logo";
import React from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import { IUser } from "@/lib/database/models/user.model";
import { MobileNavbar } from "@/components/shared/MobileNavbar";

export const AppNavbar = ({ user }: { user: IUser }) => {
	return (
		<div className="h-20 py-4 w-full border-b flex items-center justify-center bg-white dark:bg-black fixed top-0 left-0 z-50">
			<div className="container flex items-center justify-between">
				<Logo />
				<div className="flex-1 w-full flex items-center justify-end gap-4">
					<ProfileDropdown user={user} />
					<div className="lg:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</div>
	);
};
