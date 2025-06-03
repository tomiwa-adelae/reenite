import { StructureForm } from "@/app/(new)/components/forms/StructureForm";
import { getCategories } from "@/lib/actions/admin/category.actions";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const categories = await getCategories({ userId: user?.user?._id });

	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Which of these best describes your space?
				</h2>
			</div>
			<StructureForm
				userId={user?.user?._id}
				categories={categories?.categories}
			/>
		</div>
	);
};

export default page;
