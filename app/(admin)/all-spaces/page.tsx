import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search } from "lucide-react";
import { SpacesListings } from "../components/SpacesListings";
import { getSpaces } from "@/lib/actions/admin/space.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { SpacesDetails } from "../components/SpacesDetails";
import { DEFAULT_LIMIT } from "@/constants";
import Pagination from "@/components/shared/Pagination";

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const spaces = await getSpaces({
		userId: user?.user?._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});

	return (
		<div className="py-8">
			<div className="container">
				<SpacesDetails spaces={spaces.spaces} query={query} />
				{spaces?.totalPages! > 1 && (
					<Pagination totalPages={spaces?.totalPages} page={page} />
				)}
			</div>
		</div>
	);
};

export default page;
