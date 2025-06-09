import { PhotosForm } from "@/app/(new)/components/forms/PhotosForm";
import SpaceNotFound from "@/components/shared/SpaceNotFound";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

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
					Add some photos of your space
				</h2>
				<p className="text-sm lg:text-base text-muted-foreground mt-2">
					You'll need 5 photos to get started. You can add more or
					make changes later.
				</p>
			</div>
			<PhotosForm
				spaceId={spaceDetails?.space._id}
				userId={user?.user?._id}
				spacePhotos={spaceDetails?.space?.photos}
			/>
		</div>
	);
};

export default page;
