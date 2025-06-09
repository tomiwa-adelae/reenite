"use server";

import { connectToDatabase } from "@/lib/database";
import Booking from "@/lib/database/models/booking.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
	CancelBookingParams,
	GetAllBookingsParams,
	GetBookingDetailsParams,
	MarkBookingCompletedParams,
} from "@/types";
import "../../database/models";
import { revalidatePath } from "next/cache";

export const getBookings = async ({
	query,
	limit = 0,
	page,
	userId,
}: GetAllBookingsParams) => {
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
						{ startDate: { $regex: query, $options: "i" } },
						{ noOfHours: { $regex: query, $options: "i" } },
						{ noOfDays: { $regex: query, $options: "i" } },
						{ noOfWeeks: { $regex: query, $options: "i" } },
						{ noOfMonths: { $regex: query, $options: "i" } },
						{ noOfUsers: { $regex: query, $options: "i" } },
						{ totalAmount: { $regex: query, $options: "i" } },
						{ paymentStatus: { $regex: query, $options: "i" } },
						{ bookingStatus: { $regex: query, $options: "i" } },
						{ trxref: { $regex: query, $options: "i" } },
						{ transactionId: { $regex: query, $options: "i" } },
						{ bookingType: { $regex: query, $options: "i" } },
						{ bookingId: { $regex: query, $options: "i" } },
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

		const bookings = await Booking.find({ ...keyword })
			.sort({
				createdAt: -1,
			})
			.skip(skipAmount)
			.populate("user")
			.populate({
				path: "space",
				populate: { path: "category" },
			});

		const bookingsCount = await Booking.countDocuments({ ...keyword });

		return {
			status: 200,
			message: "Success",
			bookings: JSON.parse(JSON.stringify(bookings)),
			totalPages: Math.ceil(bookingsCount / limit),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Get booking details
export const getBookingDetails = async ({
	userId,
	bookingId,
}: GetBookingDetailsParams) => {
	try {
		await connectToDatabase();

		if (!userId || !bookingId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findById(userId);

		if (!user || !user.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const booking = await Booking.findById(bookingId)
			.populate("user")
			.populate({
				path: "space",
				populate: { path: "category" },
			});

		if (!booking)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		return {
			status: 200,
			message: "Successful",
			booking: JSON.parse(JSON.stringify(booking)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Cancel booking
export const cancelBooking = async ({
	userId,
	bookingId,
}: CancelBookingParams) => {
	try {
		await connectToDatabase();

		if (!userId || !bookingId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findById(userId);

		if (!user || !user.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const booking = await Booking.findById(bookingId);

		if (!booking)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		booking.bookingStatus = "cancelled";

		const updatedBooking = await booking.save();

		if (!updatedBooking)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-bookings`);
		revalidatePath(`/all-bookings/${bookingId}`);

		return {
			status: 200,
			message: "Booking successfully cancelled.",
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Cancel booking
export const markBookingCompleted = async ({
	userId,
	bookingId,
}: MarkBookingCompletedParams) => {
	try {
		await connectToDatabase();

		if (!userId || !bookingId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const user = await User.findById(userId);

		if (!user || !user.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const booking = await Booking.findById(bookingId);

		if (!booking)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		booking.bookingStatus = "completed";

		const updatedBooking = await booking.save();

		if (!updatedBooking)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-bookings`);
		revalidatePath(`/all-bookings/${bookingId}`);

		return {
			status: 200,
			message: "Booking successfully completed.",
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
