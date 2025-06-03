"use server";

import { connectToDatabase } from "@/lib/database";
import Space, { IPhoto } from "@/lib/database/models/space.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
	AddSpaceAmenitiesParams,
	AddSpaceAvailabilityParams,
	AddSpaceDailyPriceParams,
	AddSpaceDescriptionParams,
	AddSpaceDiscountsParams,
	AddSpaceHourlyPriceParams,
	AddSpaceLocationParams,
	AddSpaceMonthlyPriceParams,
	AddSpacePhotosParams,
	AddSpaceTitleParams,
	AddSpaceWeeklyPriceParams,
	CreateNewSpaceParams,
	DeleteSpaceAmenityParams,
	DeleteSpacePhotoParams,
	GetSpaceDetailsParams,
	GetSpacesParams,
	UpdateSpaceCategoryParams,
	UpdateSpaceCoverPhotoParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import "../../database/models";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all the spaces
export const getSpaces = async ({
	userId,
	page,
	query,
	limit = 0,
}: GetSpacesParams) => {
	try {
		await connectToDatabase();

		// Safely parse page and limit
		const parsedPage = Number(page);
		const validPage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

		const validLimit = typeof limit === "number" && limit > 0 ? limit : 0;

		const skipAmount = validLimit > 0 ? (validPage - 1) * validLimit : 0;

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

		const spaces = await Space.find({ user: userId })
			.sort({ createdAt: -1 })
			.skip(skipAmount);

		return {
			status: 200,
			message: "Success",
			spaces: JSON.parse(JSON.stringify(spaces)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Get space details
export const getSpaceDetails = async ({
	spaceId,
	userId,
}: GetSpaceDetailsParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId)
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

		const space = await Space.findById(spaceId).populate("category");

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		return {
			status: 201,
			message: "Successful",
			space: JSON.parse(JSON.stringify(space)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Create a new space by admin
export const createNewSpace = async ({
	category,
	userId,
}: CreateNewSpaceParams) => {
	try {
		await connectToDatabase();

		if (!category || !userId)
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

		const newSpace = await Space.create({
			category,
			user: userId,
			status: "draft",
		});

		if (!newSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		return {
			status: 201,
			message: "Successful",
			space: JSON.parse(JSON.stringify(newSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space locations
export const addSpaceLocation = async ({
	userId,
	spaceId,
	address,
	city,
	zipCode,
	state,
	country,
}: AddSpaceLocationParams) => {
	try {
		await connectToDatabase();

		if (
			!spaceId ||
			!userId ||
			!address ||
			!city ||
			!zipCode ||
			!state ||
			!country
		)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.address = address || space.address;
		space.city = city || space.city;
		space.state = state || space.state;
		space.country = country || space.country;
		space.zipCode = zipCode || space.zipCode;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-spaces/${space._id}`);

		return {
			status: 201,
			message: "Successful",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space amenities
export const addSpaceAmenities = async ({
	userId,
	spaceId,
	amenities,
}: AddSpaceAmenitiesParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		if (amenities.length === 0)
			return {
				status: 400,
				message: "Oops! Select at least one amenity",
			};

		const user = await User.findById(userId);

		if (!user || !user?.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		// Merge existing and new amenities, avoiding duplicates
		const existingAmenityNames = space.amenities.map((a: any) => a.name);
		const filteredNewAmenities = amenities.filter(
			(a: any) => !existingAmenityNames.includes(a.name)
		);

		space.amenities = [...space.amenities, ...filteredNewAmenities];
		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/new/${space._id}`);
		return {
			status: 201,
			message: "Successful",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

export const addSpacePhotos = async ({
	userId,
	spaceId,
	uploadedImages,
}: AddSpacePhotosParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId)
			return {
				status: 400,
				message: "Oops! An error occurred. Try again later",
			};

		if (uploadedImages.length === 0)
			return {
				status: 400,
				message: "Oops! Upload at least one photo",
			};

		const user = await User.findById(userId);

		if (!user || !user?.isAdmin)
			return {
				status: 400,
				message: "Oops! You are not authorized to make this request.",
			};

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.photos = Array.isArray(space.photos) ? space.photos : [];
		space.photos = [...uploadedImages, ...space.photos];

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-spaces/new/${space._id}/photos`);

		return {
			status: 201,
			message: "Successful",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

export const deleteSpacePhoto = async ({
	userId,
	spaceId,
	imageId,
}: DeleteSpacePhotoParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !imageId)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		await cloudinary.uploader.destroy(imageId, {});

		const oldPhoto = space.photos.find(
			(photo: any) => photo.imageId.toString() === imageId
		);

		if (!oldPhoto) {
			return {
				status: 400,
				message: "Image not found in the space.",
			};
		}

		const deletedPhoto = await Space.findByIdAndUpdate(
			spaceId,
			{ $pull: { photos: { imageId: oldPhoto.imageId } } },
			{ new: true }
		);

		if (oldPhoto.cover === true) {
			const updatedSpace = await Space.findById(spaceId);
			if (updatedSpace && updatedSpace.photos.length > 0) {
				// Set the first remaining photo as cover
				updatedSpace.photos[0].cover = true;
				await updatedSpace.save();
			}
		}

		if (!deletedPhoto)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-spaces/new/${space._id}/photos`);

		return { status: 200, message: "Successful" };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

export const updateSpaceCoverPhoto = async ({
	userId,
	spaceId,
	imageId,
}: UpdateSpaceCoverPhotoParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !imageId)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		// Step 1: Set all photos' cover to false
		space.photos.forEach((photo: any) => {
			photo.cover = false;
		});

		// Step 2: Set the selected image's cover to true
		const selectedPhoto = space.photos.find(
			(photo: any) => photo.imageId.toString() === imageId
		);

		if (!selectedPhoto) {
			return {
				status: 400,
				message: "Selected photo not found.",
			};
		}

		selectedPhoto.cover = true;

		await space.save();

		revalidatePath(`/all-spaces/new/${space._id}/photos`);

		return { status: 200, message: "Cover photo updated successfully." };
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space locations
export const addSpaceTitle = async ({
	userId,
	spaceId,
	title,
}: AddSpaceTitleParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !title)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.title = title || space.title;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-spaces/${space._id}`);

		return {
			status: 201,
			message: "Title successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space description
export const addSpaceDescription = async ({
	userId,
	spaceId,
	description,
}: AddSpaceDescriptionParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !description)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.description = description || space.description;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		revalidatePath(`/all-spaces/${space._id}`);

		return {
			status: 201,
			message: "Description successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space description
export const addSpaceAvailability = async ({
	userId,
	spaceId,
	availability,
}: AddSpaceAvailabilityParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.availability = availability || space.availability;

		const updatedSpace = await space.save();
		revalidatePath(`/all-spaces/${space._id}`);
		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		return {
			status: 201,
			message: "Space availability successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space hourly price
export const addSpaceHourlyPrice = async ({
	userId,
	spaceId,
	hourlyPrice,
}: AddSpaceHourlyPriceParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !hourlyPrice)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.hourlyPrice = hourlyPrice || space.hourlyPrice;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Hourly price successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space daily price
export const addSpaceDailyPrice = async ({
	userId,
	spaceId,
	dailyPrice,
}: AddSpaceDailyPriceParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !dailyPrice)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.dailyPrice = dailyPrice || space.dailyPrice;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Daily price successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space weekly price
export const addSpaceWeeklyPrice = async ({
	userId,
	spaceId,
	weeklyPrice,
}: AddSpaceWeeklyPriceParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !weeklyPrice)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.weeklyPrice = weeklyPrice || space.weeklyPrice;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Weekly price successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space monthly price
export const addSpaceMonthlyPrice = async ({
	userId,
	spaceId,
	monthlyPrice,
}: AddSpaceMonthlyPriceParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !monthlyPrice)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.monthlyPrice = monthlyPrice || space.monthlyPrice;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Monthly price successfully added.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space discounts
export const addSpaceDiscounts = async ({
	userId,
	spaceId,
	dailyDiscount,
	weeklyDiscount,
	hourlyDiscount,
	monthlyDiscount,
}: AddSpaceDiscountsParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.monthlyDiscount = monthlyDiscount || space.monthlyDiscount;
		space.dailyDiscount = dailyDiscount || space.dailyDiscount;
		space.hourlyDiscount = hourlyDiscount || space.dailyDiscount;
		space.weeklyDiscount = weeklyDiscount || space.weeklyDiscount;
		space.monthlyDiscount = monthlyDiscount || space.monthlyDiscount;
		space.status = "success";

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Space successfully created.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Update space category
export const updateSpaceCategory = async ({
	userId,
	spaceId,
	category,
}: UpdateSpaceCategoryParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		space.category = category || space.category;

		const updatedSpace = await space.save();

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Category successfully updated.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};

// Delete space amenity
export const deleteSpaceAmenity = async ({
	userId,
	spaceId,
	amenityId,
}: DeleteSpaceAmenityParams) => {
	try {
		await connectToDatabase();

		if (!spaceId || !userId || !amenityId)
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

		const space = await Space.findById(spaceId);

		if (!space)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};

		// Pull the amenity from the space's amenities array
		const updatedSpace = await Space.updateOne(
			{ _id: spaceId },
			{ $pull: { amenities: { _id: amenityId } } }
		);

		if (!updatedSpace)
			return {
				status: 400,
				message: "Oops! An error occurred! Try again later",
			};
		revalidatePath(`/all-spaces/${space._id}`);
		return {
			status: 201,
			message: "Amenity successfully removed.",
			space: JSON.parse(JSON.stringify(updatedSpace)),
		};
	} catch (error) {
		handleError(error);
		return {
			status: 400,
			message: "Oops! An error occurred. Try again later.",
		};
	}
};
