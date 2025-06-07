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
import { Header } from "./Header";

interface Props {
	categories: ICategory[];
	userId: string;
	spaceId: string;
	category: ICategory;
	closeSmallModal?: () => void;
}

export const EditCategoryComponent = ({
	categories,
	category,
	userId,
	spaceId,
	closeSmallModal,
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
			// @ts-ignore
			closeSmallModal();
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative pt-8">
			<Header title={"Category"} />
			<div className="lg:h-[calc(100vh-80px)] lg:pb-32 overflow-auto">
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
										className="size-[45px] lg:size-[60px] object-cover"
									/>
									<h5 className="font-medium text-base lg:text-lg">
										{name}
									</h5>
								</div>
							))}
						</div>
					</div>
				</ScrollArea>
			</div>
			<footer className=" bg-white fixed left-0 lg:left-auto flex items-center justify-center w-full lg:w-1/2 bottom-0  border-t h-20 py-4">
				<div className="container flex items-center justify-between lg:justify-end">
					<Button
						onClick={closeSmallModal}
						type="submit"
						size={"lg"}
						variant={"ghost"}
						className="lg:hidden"
					>
						Close
					</Button>
					<Button
						disabled={!selectCategory || loading}
						onClick={handleSubmit}
						size="lg"
					>
						{loading ? <Loader /> : "Save"}
					</Button>
				</div>
			</footer>
		</div>
	);
};
