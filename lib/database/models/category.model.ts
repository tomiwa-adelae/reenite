import { Document, Schema, model, models } from "mongoose";

// Define the Category interface
export interface ICategory extends Document {
	name: string;
	image: string;
	imageId: string;
	_id: string;
}

// Define the Category schema
const CategorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
	},
	imageId: {
		type: String,
		required: true,
	},
});

// Define the Category model
const Category =
	models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
