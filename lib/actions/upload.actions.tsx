"use server";
import { v2 as cloudinary } from "cloudinary";
import { handleError } from "../utils";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImages = async ({
	spacePhotos,
	photos,
}: {
	spacePhotos: any;
	photos: string[];
}) => {
	try {
		const uploadPromises = photos.map((image) => {
			const isImage =
				image.startsWith("data:image/jpeg") ||
				image.startsWith("data:image/png") ||
				image.startsWith("data:image/jpg") ||
				image.startsWith("data:image/gif") ||
				image.startsWith("data:image/webp");

			const isPDF = image.startsWith("data:application/pdf");

			return cloudinary.uploader.upload(image, {
				folder: "reenite",
				resource_type: isImage || isPDF ? "image" : "raw",
			});
		});

		const results = await Promise.all(uploadPromises);

		return results.map((result, index) => ({
			src: result.secure_url,
			imageId: result.public_id,
			cover: spacePhotos.length === 0 && index === 0, // Only first image if no existing spacePhotos
		}));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error.message || "Oops! Images not uploaded. Try again later",
		};
	}
};
