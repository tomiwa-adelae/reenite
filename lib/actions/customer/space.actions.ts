"use server";

import { connectToDatabase } from "@/lib/database";
import Space from "@/lib/database/models/space.model";
import { handleError } from "@/lib/utils";
import "../../database/models";

export const getSpaces = async () => {
	try {
		await connectToDatabase();

		const spaces = await Space.find()
			.sort({ createdAt: -1 })
			.populate("category");

		return {
			status: 200,
			message: "Success",
			spaces: JSON.parse(JSON.stringify(spaces)),
		};
	} catch (error) {
		handleError(error);
	}
};

export const getSpaceDetails = async (spaceId: string) => {
	try {
		await connectToDatabase();

		if (!spaceId) return { status: 400, message: "An error occurred" };

		const space = await Space.findById(spaceId).populate("category");

		if (!space)
			return {
				status: 400,
				message: "Space not found. An error occurred!",
			};

		return {
			status: 200,
			message: "Success",
			space: JSON.parse(JSON.stringify(space)),
		};
	} catch (error) {
		handleError(error);
	}
};
