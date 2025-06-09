import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { EditProfilePicture } from "../../components/EditProfilePicture";
import { NameBox } from "../../components/NameBox";
import { PhoneNumberBox } from "../../components/PhoneNumberBox";
import { OccupationBox } from "../../components/OccupationBox";
import { LocationBox } from "../../components/LocationBox";
import { CompanyBox } from "../../components/CompanyBox";
import { BioBox } from "../../components/BioBox";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);
	return (
		<div className="py-8">
			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
				<div className="lg:col-span-2">
					<div className="relative flex flex-col items-center justify-center">
						<Image
							src={user?.user?.picture || DEFAULT_PROFILE_PICTURE}
							alt={
								`${user?.user?.firstName}'s picture` ||
								"User profile picture"
							}
							width={1000}
							height={1000}
							className="size-[250px] object-cover rounded-full"
						/>
						<EditProfilePicture userId={user?.user?._id} />
					</div>
				</div>
				<div className="col-span-3 mt-8 lg:mt-0">
					<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl flex items-center justify-start">
						My profile
					</h2>
					<div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-4">
						<NameBox
							userId={user?.user?._id}
							firstName={user?.user?.firstName}
							lastName={user?.user?.lastName}
						/>
						<div className="flex items-center justify-start gap-4 border-b py-6 hover:rounded-lg hover:bg-muted px-4 cursor-not-allowed transition-all text-muted-foreground">
							<Mail className="size-6 lg:size-7" />{" "}
							<p className="text-sm lg:text-base line-clamp-1">
								My email:{" "}
								<span className="text-black">
									{user?.user?.email}
								</span>
							</p>
						</div>
						<PhoneNumberBox
							userId={user?.user?._id}
							phoneNumber={user?.user?.phoneNumber}
						/>
						<OccupationBox
							userId={user?.user?._id}
							occupation={user?.user?.occupation}
						/>
						<LocationBox
							userId={user?.user?._id}
							address={user?.user?.address}
							city={user?.user?.city}
							state={user?.user?.state}
							country={user?.user?.country}
						/>
						<CompanyBox
							userId={user?.user?._id}
							company={user?.user?.company}
						/>
					</div>
					<div className="mt-6">
						<BioBox
							userId={user?.user?._id}
							bio={user?.user?.bio}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
