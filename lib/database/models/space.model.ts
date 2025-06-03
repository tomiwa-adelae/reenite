import { model, models, Schema, Types } from "mongoose";

export interface IAmenity {
	name?: string;
	icon?: string;
}

export interface IPhoto {
	src?: string;
	imageId?: string;
	cover?: boolean;
}

export interface IAvailability {
	day?: string;
	openingHour?: string;
	closingHour?: string;
	isOpen?: boolean;
}

export interface ISpace {
	_id?: Types.ObjectId;
	user: Types.ObjectId;
	category: Types.ObjectId;
	address?: string;
	city?: string;
	zipCode?: string;
	state?: string;
	country?: string;
	amenities?: IAmenity[];
	photos?: IPhoto[];
	title?: string;
	description?: string;
	hourlyPrice?: string;
	dailyPrice?: string;
	weeklyPrice?: string;
	monthlyPrice?: string;
	hourlyDiscount?: string;
	dailyDiscount?: string;
	weeklyDiscount?: string;
	monthlyDiscount?: string | boolean;
	availability?: IAvailability[];
	createdAt?: Date;
	updatedAt?: Date;
	status?: string;
}

const AmenitiesSchema = new Schema<IAmenity>({
	name: {
		type: String,
	},
	icon: {
		type: String,
	},
});

const PhotosSchema = new Schema<IPhoto>({
	src: {
		type: String,
	},
	imageId: {
		type: String,
	},
	cover: {
		type: Boolean,
	},
});

const AvailabilitySchema = new Schema<IAvailability>({
	day: {
		type: String,
	},
	openingHour: {
		type: String,
	},
	closingHour: {
		type: String,
	},
	isOpen: {
		type: Boolean,
	},
});

const SpaceSchema = new Schema<ISpace>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		zipCode: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
		},
		amenities: {
			type: [AmenitiesSchema],
			default: [],
		},
		photos: {
			type: [PhotosSchema],
			default: [],
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		hourlyPrice: {
			type: String,
		},
		dailyPrice: {
			type: String,
		},
		weeklyPrice: {
			type: String,
		},
		monthlyPrice: {
			type: String,
		},
		hourlyDiscount: {
			type: String,
		},
		dailyDiscount: {
			type: String,
		},
		weeklyDiscount: {
			type: String,
		},
		monthlyDiscount: {
			type: String || Boolean,
		},
		availability: {
			type: [AvailabilitySchema],
			default: [],
		},
		status: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Space = models.Space || model<ISpace>("Space", SpaceSchema);

export default Space;
