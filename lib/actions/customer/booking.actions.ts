"use server";

import { connectToDatabase } from "@/lib/database";
import Booking from "@/lib/database/models/booking.model";
import Space from "@/lib/database/models/space.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
	CancelBookingParams,
	CreateBookingParams,
	GetAllBookingsParams,
	GetBookingDetailsParams,
} from "@/types";
import { revalidatePath } from "next/cache";

export const createBooking = async ({
	spaceId,
	userId,
	trxref,
	transactionId,
	bookingStartDate,
	bookingEndDate,
	noOfHours,
	noOfDays,
	noOfWeeks,
	noOfMonths,
	noOfUsers,
	totalAmount,
	paymentStatus,
	bookingStatus,
	bookingType,
}: CreateBookingParams) => {
	try {
		await connectToDatabase();

		if (!userId || !spaceId)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
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
		let bookingId = `BK-${year}-${suffix}`;

		// Ensure uniqueness
		let existing = await Booking.findOne({ bookingId });
		while (existing) {
			suffix = generateSuffix();
			bookingId = `BK-${year}-${suffix}`;
			existing = await Booking.findOne({ bookingId });
		}

		const details = {
			user: userId,
			space: spaceId,
			startDate: bookingStartDate,
			endDate: bookingEndDate,
			noOfHours,
			noOfDays,
			noOfWeeks,
			noOfMonths,
			noOfUsers,
			totalAmount,
			paymentStatus,
			bookingStatus,
			trxref,
			transactionId,
			bookingType,
			bookingId,
		};

		const booking = await Booking.create({ ...details });

		if (!booking)
			return {
				status: 400,
				message: "Oops! An error occurred. Booking not created.",
			};

		return {
			status: 201,
			message: "Congratulations! Your booking was successful",
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

		if (!user)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const booking = await Booking.findOne({ user: userId, _id: bookingId })
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

		if (!user)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const bookings = await Booking.find({ user: userId, ...keyword })
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

		if (!user)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		const booking = await Booking.findOne({ user: userId, _id: bookingId });

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

		revalidatePath(`/bookings`);
		revalidatePath(`/bookings/${bookingId}`);

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
