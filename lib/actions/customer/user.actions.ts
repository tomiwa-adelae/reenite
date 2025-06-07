"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
	CreateUserParams,
	UpdateProfileParams,
	UpdateProfilePictureParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a user account with Clerk
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		if (!user.email || !user.firstName || !user.lastName)
			return {
				status: 400,
				message: "Please fill all fields!",
			};

		function generateSuffix(length = 4): string {
			const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			let result = "";
			for (let i = 0; i < length; i++) {
				result += chars.charAt(
					Math.floor(Math.random() * chars.length)
				);
			}
			return result;
		}

		const year = new Date().getFullYear();
		let suffix = generateSuffix();
		let userId = `RN-${year}-${suffix}`;

		// Ensure uniqueness
		let existing = await User.findOne({ userId });
		while (existing) {
			suffix = generateSuffix();
			userId = `RN-${year}-${suffix}`;
			existing = await User.findOne({ userId });
		}

		const details = {
			...user,
			userId,
		};

		const newUser = await User.create(details);

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

// Update user profile picture
export const updateProfilePicture = async ({
	userId,
	picture,
	pictureId,
}: UpdateProfilePictureParams) => {
	try {
		await connectToDatabase();

		if (!userId || !picture || !pictureId)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		// If there's an existing pictureId, delete the image from Cloudinary
		if (user.pictureId) {
			try {
				await cloudinary.uploader.destroy(user.pictureId);
			} catch (cloudinaryError) {
				console.error(
					"Error deleting previous picture:",
					cloudinaryError
				);
			}
		}
		user.picture = picture || user.picture;
		user.pictureId = pictureId || user.pictureId;

		const updatedUser = await user.save();
		if (!updatedUser)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath("/");
		revalidatePath("/spaces");
		revalidatePath("/profile");
		revalidatePath("/about");
		revalidatePath("/about/edit");
		revalidatePath("/dashboard");
		revalidatePath("/bookings");
		revalidatePath("/all-bookings");
		revalidatePath("/all-users");
		revalidatePath("/all-spaces");

		return { status: 200, message: "Profile picture successfully updated" };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update user profile
export const updateUserProfile = async ({
	userId,
	firstName,
	lastName,
	occupation,
	phoneNumber,
	bio,
	address,
	city,
	state,
	country,
	company,
}: UpdateProfileParams) => {
	try {
		await connectToDatabase();

		if (!userId)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.occupation = occupation || user.occupation;
		user.phoneNumber = phoneNumber || user.phoneNumber;
		user.bio = bio || user.bio;
		user.address = address || user.address;
		user.city = city || user.city;
		user.state = state || user.state;
		user.country = country || user.country;
		user.company = company || user.company;

		const updatedUser = await user.save();
		if (!updatedUser)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath("/");
		revalidatePath("/spaces");
		revalidatePath("/profile");
		revalidatePath("/about");
		revalidatePath("/about/edit");
		revalidatePath("/dashboard");
		revalidatePath("/bookings");
		revalidatePath("/all-bookings");
		revalidatePath("/all-users");
		revalidatePath("/all-spaces");

		return { status: 200, message: "Profile successfully updated" };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
