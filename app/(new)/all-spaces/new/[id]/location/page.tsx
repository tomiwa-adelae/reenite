import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getSpaceDetails } from "@/lib/actions/admin/space.actions";
import { LocationForm } from "@/app/(new)/components/forms/LocationForm";
import SpaceNotFound from "@/components/shared/SpaceNotFound";

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
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Where's your space located?
				</h2>
			</div>
			<LocationForm
				spaceId={spaceDetails?.space?._id}
				userId={user?.user?._id}
				address={spaceDetails?.space?.address}
				city={spaceDetails?.space?.city}
				state={spaceDetails?.space?.state}
				zipCode={spaceDetails?.space?.zipCode}
				country={spaceDetails?.space?.country}
			/>
		</div>
	);
};

export default page;
