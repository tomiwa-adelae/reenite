import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search } from "lucide-react";
import { SpacesListings } from "../components/SpacesListings";
import { getSpaces } from "@/lib/actions/admin/space.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { SpacesDetails } from "../components/SpacesDetails";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const spaces = await getSpaces({ userId: user?.user?._id });

	return (
		<div className="py-8">
			<div className="container">
				<SpacesDetails spaces={spaces.spaces} />
			</div>
		</div>
	);
};

export default page;
