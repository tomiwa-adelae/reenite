import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NoAboutDetails } from "../components/NoAboutDetails";
import {
	BriefcaseBusiness,
	Building2,
	CircleUser,
	Mail,
	MapPinHouse,
	Pen,
	Phone,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import Image from "next/image";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "About me - Reenite",
};

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	return (
		<div>
			<div className="container">
				<h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center justify-start">
					<span>About me </span>
					<Button
						size="sm"
						asChild
						variant={"ghost"}
						className="bg-[#F2F2F2] px-4 py-4 rounded-lg ml-3 font-semibold"
					>
						<Link href="/about/edit">
							<Pen className="size-4 mr-1" /> Edit
						</Link>
					</Button>
				</h2>
				<div className="mt-4 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4">
						{user?.user?.picture && (
							<Image
								src={
									user?.user?.picture ||
									DEFAULT_PROFILE_PICTURE
								}
								alt={
									`${user?.user?.firstName}'s picture` ||
									"User profile picture"
								}
								width={1000}
								height={1000}
								className="size-[150px] object-cover rounded-full"
							/>
						)}
						{!user?.user?.picture && (
							<div className="bg-primary rounded-full text-white size-[120px] p-8 flex items-center justify-center">
								<h2 className="text-6xl font-bold">
									{user?.user?.firstName.slice(0, 1)}
								</h2>
							</div>
						)}
						<h2 className="font-semibold text-3xl">
							{user?.user?.firstName} {user?.user?.lastName}
						</h2>
					</div>
					{!user?.user?.occupation && !user?.user?.bio && (
						<NoAboutDetails />
					)}
				</div>
				<div className="mt-10 space-y-6 text-base">
					<p>
						<CircleUser className="size-6 inline-block mr-3" />
						<span>
							My name: {user?.user?.firstName}{" "}
							{user?.user?.lastName}
						</span>
					</p>
					<p>
						<Mail className="size-6 inline-block mr-3" />
						<span>My email: {user?.user?.email}</span>
					</p>
					{user?.user?.phoneNumber && (
						<p>
							<Phone className="size-6 inline-block mr-3" />
							<span>
								My phone number: {user?.user?.phoneNumber}
							</span>
						</p>
					)}
					{user?.user?.address && (
						<p>
							<MapPinHouse className="size-6 inline-block mr-3" />
							<span>
								My location: {user?.user?.address},{" "}
								{user?.user?.city}, {user?.user?.state},{" "}
								<span className="capitalize">
									{user?.user?.country}
								</span>
							</span>
						</p>
					)}
					{user?.user?.occupation && (
						<p>
							<BriefcaseBusiness className="size-6 inline-block mr-3" />
							<span>My work: {user?.user?.occupation}</span>
						</p>
					)}
					{user?.user?.company && (
						<p>
							<Building2 className="size-6 inline-block mr-3" />
							<span>My company:{user?.user?.company}</span>
						</p>
					)}
					<p className="text-base lg:text-lg mt-6">
						{user?.user?.bio}
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
