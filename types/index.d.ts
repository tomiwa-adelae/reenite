import { AmenitiesOption } from "@/app/(new)/components/forms/AmenitiesForm";

declare interface CreateUserParams {
	clerkId: string;
	firstName: string | null;
	lastName: string | null;
	email: string;
	picture: string;
}

declare interface UpdateProfilePictureParams {
	picture: string;
	pictureId: string;
	userId: string;
}

declare interface UpdateProfileParams {
	userId: string;
	firstName?: string;
	lastName?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	occupation?: string;
	company?: string;
	phoneNumber?: string;
	bio?: string;
}

declare interface GetCustomersParams {
	query?: string;
	limit?: number;
	page?: string;
	userId: string;
}

declare interface GetCustomerDetailsParams {
	customerId: string;
	userId: string;
}

declare interface SuspendCustomerAccountParams {
	customerId: string;
	userId: string;
}

declare interface UnsuspendCustomerAccountParams {
	customerId: string;
	userId: string;
}

declare interface DeleteCustomerAccountParams {
	customerId: string;
	userId: string;
}

declare interface GetAllBookingsParams {
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

declare interface AddSpaceHourlyPricingParams {
	userId: string;
	spaceId: string;
	hourlyPricing: any;
}

declare interface AddSpaceDailyPricingParams {
	userId: string;
	spaceId: string;
	dailyPricing: any;
}

declare interface AddSpaceWeeklyPricingParams {
	userId: string;
	spaceId: string;
	weeklyPricing: any;
}

declare interface AddSpaceMonthlyPricingParams {
	userId: string;
	spaceId: string;
	monthlyPricing: any;
}

declare interface UpdateSpacePricingParams {
	userId: string;
	spaceId: string;
	hourlyPrice: string;
	dailyPrice: string;
	weeklyPrice: string;
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

declare interface CreateBookingParams {
	userId: string;
	spaceId: string;
	trxref: string;
	transactionId: string;
	totalAmount: string;
	noOfUsers: string;
	noOfHours: string;
	noOfDays: string;
	noOfWeeks: string;
	noOfMonths: string;
	paymentStatus: string;
	bookingStatus: string;
	bookingStartDate: string;
	bookingType: string;
}

declare interface GetBookingDetailsParams {
	userId: string;
	bookingId: string;
}

declare interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

declare interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}
