"use server";

import { sampleCategories } from "@/data/categories";
import { connectToDatabase } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

export const getCategories = async ({ userId }: { userId: string }) => {
	try {
		await connectToDatabase();
		// await Category.insertMany(sampleCategories);

		if (!userId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findById(userId);

		if (!user || !user?.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const categories = await Category.find().sort({ createdAt: -1 });

		return {
			status: 200,
			message: "Success",
			categories: JSON.parse(JSON.stringify(categories)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
