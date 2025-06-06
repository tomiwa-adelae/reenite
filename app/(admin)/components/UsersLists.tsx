import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/database/models/user.model";
import Link from "next/link";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";

export const UsersLists = ({ customers }: { customers: IUser[] }) => {
	return (
		<div className="md:hidden">
			{customers.map((customer) => (
				<Link
					href={`/all-users/${customer._id}`}
					className="hover:bg-[#F7F7F7] transition-all p-2 rounded-2xl flex items-center justify-start gap-4 group cursor-pointer"
				>
					<Image
						src={customer.picture || DEFAULT_PROFILE_PICTURE}
						alt={`${customer.firstName}'s picture`}
						width={1000}
						height={1000}
						className="size-[70px] object-cover rounded-2xl"
					/>
					<div className="flex-1 flex items-center justify-between gap-2">
						<div className="flex-1">
							<h5 className="text-base font-medium">
								{customer.firstName} {customer.lastName}
							</h5>
							<p className="text-sm text-muted-foreground">
								{customer.email}
							</p>
						</div>
						<Button variant={"ghost"} size="icon">
							<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
						</Button>
					</div>
				</Link>
			))}
		</div>
	);
};
