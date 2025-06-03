import { AmenitiesOption } from "@/app/(new)/components/forms/AmenitiesForm";

declare interface CreateUserParams {
	clerkId: string;
	firstName: string | null;
	lastName: string | null;
	email: string;
	picture: string;
}

declare interface GetCustomersParams {
	query?: string;
	limit?: number;
	page?: string;
	userId: string;
}

declare interface GetSpacesParams {
	query?: string;
	limit?: number;
	page?: string;
	userId: string;
}

declare interface CreateNewSpaceParams {
	category: string;
	userId: string;
}

declare interface GetSpaceDetailsParams {
	spaceId: string;
	userId: string;
}

declare interface AddSpaceLocationParams {
	spaceId: string;
	userId: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

declare interface AddSpaceAmenitiesParams {
	spaceId: string;
	userId: string;
	amenities: AmenitiesOption[];
}

declare interface AddSpacePhotosParams {
	userId: string;
	spaceId: string;
	// uploadedImages: {
	// 	src: string;
	// 	imageId: string;
	// 	cover: boolean;
	// };
	uploadedImages: any;
}

declare interface DeleteSpacePhotoParams {
	userId: string;
	spaceId: string;
	imageId: string;
}

declare interface UpdateSpaceCoverPhotoParams {
	userId: string;
	spaceId: string;
	imageId: string;
}

declare interface AddSpaceTitleParams {
	userId: string;
	spaceId: string;
	title: string;
}

declare interface AddSpaceDescriptionParams {
	userId: string;
	spaceId: string;
	description: string;
}

declare interface AddSpaceAvailabilityParams {
	userId: string;
	spaceId: string;
	availability: any;
}

declare interface AddSpaceHourlyPriceParams {
	userId: string;
	spaceId: string;
	hourlyPrice: string;
}

declare interface AddSpaceDailyPriceParams {
	userId: string;
	spaceId: string;
	dailyPrice: string;
}

declare interface AddSpaceWeeklyPriceParams {
	userId: string;
	spaceId: string;
	weeklyPrice: string;
}

declare interface AddSpaceMonthlyPriceParams {
	userId: string;
	spaceId: string;
	monthlyPrice: string;
}

declare interface AddSpaceDiscountsParams {
	userId: string;
	spaceId: string;
	monthlyDiscount?: string;
	hourlyDiscount?: string;
	weeklyDiscount?: string;
	dailyDiscount?: string;
}

declare interface UpdateSpaceCategoryParams {
	userId: string;
	spaceId: string;
	category: string;
}

declare interface DeleteSpaceAmenityParams {
	userId: string;
	spaceId: string;
	amenityId: string;
}
