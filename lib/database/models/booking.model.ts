import { model, models, Schema, Types } from "mongoose";
import crypto from "crypto";

export interface IBooking {
	_id?: Types.ObjectId;
	bookingId: string;
	user: Types.ObjectId;
	space: Types.ObjectId;
	startDate: Date;
	endDate?: Date;
	noOfHours?: string;
	noOfDays?: string;
	noOfWeeks?: string;
	noOfMonths?: string;
	noOfUsers?: string;
	totalAmount: string;
	paymentStatus?: string;
	bookingStatus?: string;
	trxref: string;
	transactionId: string;
	bookingType: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		space: {
			type: Schema.Types.ObjectId,
			ref: "Space",
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
		},
		noOfHours: {
			type: String,
		},
		noOfDays: {
			type: String,
		},
		noOfWeeks: {
			type: String,
		},
		noOfMonths: {
			type: String,
		},
		noOfUsers: {
			type: String,
		},
		totalAmount: {
			type: String,
			required: true,
		},
		paymentStatus: {
			type: String,
			default: "pending",
		},
		bookingStatus: {
			type: String,
			default: "pending",
		},
		trxref: {
			type: String,
			required: true,
		},
		transactionId: {
			type: String,
			required: true,
		},
		bookingType: {
			type: String,
			required: true,
		},
		bookingId: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ timestamps: true }
);

// // Helper to generate a unique 4-char alphanumeric string
// function generateSuffix(length = 4): string {
// 	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// 	let result = "";
// 	for (let i = 0; i < length; i++) {
// 		result += chars.charAt(Math.floor(Math.random() * chars.length));
// 	}
// 	return result;
// }

// // Pre-save hook to generate the bookingId
// BookingSchema.pre<IBooking>("save", async function (next) {
// 	if (!this.bookingId) {
// 		const year = new Date().getFullYear();
// 		let suffix = generateSuffix();
// 		let bookingId = `BK-${year}-${suffix}`;

// 		// Ensure uniqueness
// 		let existing = await Booking.findOne({ bookingId });
// 		while (existing) {
// 			suffix = generateSuffix();
// 			bookingId = `BK-${year}-${suffix}`;
// 			existing = await Booking.findOne({ bookingId });
// 		}

// 		this.bookingId = bookingId;
// 	}

// 	next();
// });

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
