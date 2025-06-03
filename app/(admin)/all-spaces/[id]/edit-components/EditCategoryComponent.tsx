"use client";
import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { spaceCategories } from "@/constants";
import { updateSpaceCategory } from "@/lib/actions/admin/space.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
	categories: ICategory[];
	userId: string;
	spaceId: string;
	category: ICategory;
}

export const EditCategoryComponent = ({
	categories,
	category,
	userId,
	spaceId,
}: Props) => {
	const [selectCategory, setSelectCategory] = useState(category._id);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			if (!selectCategory)
				return toast.error("Please select a structure!");

			const res = await updateSpaceCategory({
				userId,
				spaceId,
				category: selectCategory,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success("Category successfully updated!");
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative pt-8">
			<div className="container">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Category
				</h2>
			</div>
			<div className="h-[calc(100vh-80px)] pb-32 overflow-auto">
				<ScrollArea>
					<div className="py-8 container">
						<div className="grid grid-cols-2 gap-4">
							{categories.map(({ image, name, _id }, index) => (
								<div
									key={index}
									className={cn(
										"border-2 rounded-2xl p-6 flex flex-col items-start justify-center gap-2 cursor-pointer hover:bg-[#F7F7F7] hover:border-black hover:border-2 transition-all",
										_id === selectCategory &&
											"border-black bg-[#F7F7F7]"
									)}
									onClick={() => setSelectCategory(_id)}
								>
									<Image
										src={image}
										alt={`${name}'s icon`}
										width={1000}
										height={1000}
										className="size-[60px] object-cover"
									/>
									<h5 className="font-medium text-lg">
										{name}
									</h5>
								</div>
							))}
						</div>
					</div>
				</ScrollArea>
			</div>
			<footer className=" bg-white fixed flex items-center justify-center w-1/2 bottom-0  border-t h-20 py-4">
				<div className="container flex items-center justify-end">
					<Button
						disabled={!selectCategory || loading}
						onClick={handleSubmit}
						size="lg"
					>
						{loading ? <Loader /> : "Next"}
					</Button>
				</div>
			</footer>
		</div>
	);
};
