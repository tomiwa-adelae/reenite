"use client";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/Loader";
import { Footer } from "@/app/(new)/components/Footer";
import { ICategory } from "@/lib/database/models/category.model";
import { createNewSpace } from "@/lib/actions/admin/space.actions";

interface Props {
	categories: ICategory[];
	userId: string;
}

export const StructureForm = ({ categories, userId }: Props) => {
	const router = useRouter();

	const [selectCategory, setSelectCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			if (!selectCategory)
				return toast.error("Please select a structure!");

			const res = await createNewSpace({
				userId,
				category: selectCategory,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success("Structure successfully added!");

			return router.push(`/all-spaces/new/${res?.space?._id}/location`);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="container max-w-3xl">
				<div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
					{categories?.map(({ image, name, _id }, index) => (
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
								alt={`${name}'s image`}
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
			<Footer>
				<div className="container flex items-center justify-between gap-4">
					<Button
						className="underline"
						variant={"ghost"}
						asChild
						size={loading ? "icon" : "lg"}
					>
						<Link href="/all-spaces/new">Back</Link>
					</Button>
					<Button
						disabled={!selectCategory || loading}
						onClick={handleSubmit}
						size="lg"
					>
						{loading ? <Loader /> : "Next"}
					</Button>
				</div>
			</Footer>
		</div>
	);
};
