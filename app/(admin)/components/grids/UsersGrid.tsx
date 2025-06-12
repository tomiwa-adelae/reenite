import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { IUser } from "@/lib/database/models/user.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const UsersGrid = ({ customers }: { customers: any }) => {
	return (
		<div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{customers?.map((customer: IUser, index: string) => (
				<Link href={`/all-users/${customer?._id}`} key={index}>
					<Image
						src={customer.picture || DEFAULT_PROFILE_PICTURE}
						alt={`${customer.firstName}'s picture`}
						width={1000}
						height={1000}
						className="aspect-square object-cover rounded-full"
					/>
					<h4 className="text-lg text-center md:text-xl font-medium mt-4 line-clamp-1">
						{customer?.firstName} {customer?.lastName}
					</h4>
					<p className="text-sm md:text-base text-muted-foreground mt-1 break-words text-center line-clamp-1">
						{customer?.email}
					</p>
				</Link>
			))}
		</div>
	);
};
