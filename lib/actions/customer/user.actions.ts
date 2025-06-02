"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

// Create a user account with Clerk
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		if (!user.email || !user.firstName || !user.lastName)
			return {
				status: 400,
				message: "Please fill all fields!",
			};

		const newUser = await User.create(user);

		if (!newUser)
			return {
				status: 400,
				message:
					"Your account was not successfully created. Try again later",
			};

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

// Get user details from DB
export const getUserInfo = async (clerkId: string) => {
	try {
		await connectToDatabase();

		if (!clerkId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findOne({ clerkId });

		if (!user)
			return {
				status: 400,
				message: "Oops! Your account was not found. Try again later",
			};

		return {
			status: 200,
			message: "Success",
			user: JSON.parse(JSON.stringify(user)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
