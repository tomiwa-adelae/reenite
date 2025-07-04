import { TitleForm } from "@/app/(new)/components/forms/TitleForm";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Give your space a title - Admin - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

const page = async ({ params }: { params: any }) => {
	const { id } = await params;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const spaceDetails = await getSpaceDetails({
		userId: user?.user?._id,
		spaceId: id,
	});

	if (spaceDetails?.status === 400) return <SpaceNotFound />;
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					Now, let's give your space a title
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Short titles work best. Have fun with it—you can always
					change it later.
				</p>
			</div>
			<TitleForm
				spaceId={spaceDetails?.space._id}
				userId={user?.user?._id}
				title={spaceDetails?.space?.title}
			/>
		</div>
	);
};

export default page;
