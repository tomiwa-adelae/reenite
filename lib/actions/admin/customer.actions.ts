"use server";

import { connectToDatabase } from "@/lib/database";
import Booking from "@/lib/database/models/booking.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
	DeleteCustomerAccountParams,
	GetCustomerDetailsParams,
	GetCustomersParams,
	SuspendCustomerAccountParams,
	UnsuspendCustomerAccountParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import "../../database/models";

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

		const keyword = query
			? {
					$or: [
						{ email: { $regex: query, $options: "i" } },
						{ firstName: { $regex: query, $options: "i" } },
						{ lastName: { $regex: query, $options: "i" } },
						{ phoneNumber: { $regex: query, $options: "i" } },
						{ bio: { $regex: query, $options: "i" } },
						{ address: { $regex: query, $options: "i" } },
						{ state: { $regex: query, $options: "i" } },
						{ userId: { $regex: query, $options: "i" } },
						{ city: { $regex: query, $options: "i" } },
						{ country: { $regex: query, $options: "i" } },
						{ occupation: { $regex: query, $options: "i" } },
						{ status: { $regex: query, $options: "i" } },
						{ company: { $regex: query, $options: "i" } },
					],
			  }
			: {};

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

		const customers = await User.find({ _id: { $ne: userId }, ...keyword })
			.sort({
				createdAt: -1,
			})
			.skip(skipAmount);

		const customersCount = await User.countDocuments({ ...keyword });

		return {
			status: 200,
			message: "Success",
			customers: JSON.parse(JSON.stringify(customers)),
			totalPages: Math.ceil(customersCount / limit),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

export const getCustomerDetails = async ({
	customerId,
	userId,
}: GetCustomerDetailsParams) => {
	try {
		await connectToDatabase();

		if (!userId || !customerId)
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

		const customer = await User.findById(customerId);

		if (!customer)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const bookings = await Booking.find({ user: customerId })
			.sort({ createdAt: -1 })
			.populate({
				path: "space",
				populate: { path: "category" },
			})
			.populate("user");

		return {
			status: 200,
			message: "Success",
			customer: JSON.parse(JSON.stringify(customer)),
			bookings: JSON.parse(JSON.stringify(bookings)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Suspend user account
export const suspendCustomer = async ({
	userId,
	customerId,
}: SuspendCustomerAccountParams) => {
	try {
		await connectToDatabase();

		if (!userId || !customerId)
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

		const customer = await User.findById(customerId);

		if (!customer)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		customer.status = "suspended";

		const updatedCustomer = await customer.save();

		if (!updatedCustomer)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		revalidatePath(`/all-users/${customerId}`);
		revalidatePath(`/all-users`);
		revalidatePath(`/dashboard`);

		return { status: 200, message: "Successfully suspended user" };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Unsuspend customer account
export const unsuspendCustomer = async ({
	userId,
	customerId,
}: UnsuspendCustomerAccountParams) => {
	try {
		await connectToDatabase();

		if (!userId || !customerId)
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

		const customer = await User.findById(customerId);

		if (!customer)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		customer.status = "active";

		const updatedCustomer = await customer.save();

		if (!updatedCustomer)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		revalidatePath(`/all-users/${customerId}`);
		revalidatePath(`/all-users`);
		revalidatePath(`/dashboard`);

		return { status: 200, message: "Customer's account is now active" };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Delete customer account
export const deleteCustomer = async ({
	userId,
	customerId,
}: DeleteCustomerAccountParams) => {
	try {
		await connectToDatabase();

		if (!userId || !customerId)
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

		const customer = await User.findById(customerId);

		// Step 1: Delete user from Clerk via Admin API
		const clerkRes = await fetch(
			`https://api.clerk.com/v1/users/${customer?.clerkId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!clerkRes.ok) {
			const errorText = await clerkRes.text();
			console.error("Clerk error:", errorText);
			return {
				status: 500,
				message: "Failed to delete user from Clerk.",
			};
		}

		const deletedCustomer = await User.findByIdAndDelete(customerId);

		if (!deletedCustomer)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		revalidatePath("/all-users");
		revalidatePath("/dashboard");

		return { status: 200, message: "Successfully deleted user" };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
