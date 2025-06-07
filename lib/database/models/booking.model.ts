import { model, models, Schema, Types } from "mongoose";
import crypto from "crypto";

export interface IBooking {
	_id?: Types.ObjectId;
	bookingId: string;
	user: Types.ObjectId;
	space: Types.ObjectId;
	startDate: string;
	endDate?: string;
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
			type: String,
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

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
