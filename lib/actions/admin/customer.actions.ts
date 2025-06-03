"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

export const getCustomers = async ({
	query,
	limit = 0,
	page,
	userId,
}: GetCustomersParams) => {
	try {
		await connectToDatabase();

		// Safely parse page and limit
		const parsedPage = Number(page);
		const validPage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

		const validLimit = typeof limit === "number" && limit > 0 ? limit : 0;

		const skipAmount = validLimit > 0 ? (validPage - 1) * validLimit : 0;

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

		const customers = await User.find({ _id: { $ne: userId } })
			.sort({
				createdAt: -1,
			})
			.skip(skipAmount);

		return {
			status: 200,
			message: "Success",
			customers: JSON.parse(JSON.stringify(customers)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
