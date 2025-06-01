"use client";
import { Button } from "@/components/ui/button";

import { spaceCategories } from "@/constants";
import Image from "next/image";

export const EditCategoryComponent = () => {
	return (
		<div className="relative pt-8">
			<div className="container">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Category
				</h2>
			</div>
			<div className="py-8 container">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{spaceCategories.map(({ icon, name }, index) => (
						<div
							key={index}
							className="border-2 rounded-2xl p-6 flex flex-col items-start justify-center gap-2 cursor-pointer hover:border-black hover:border-2 transition-all"
						>
							<Image
								src={icon}
								alt={`${name}'s icon`}
								width={1000}
								height={1000}
								className="size-[60px] object-cover"
							/>
							<h5 className="font-medium text-lg">{name}</h5>
						</div>
					))}
				</div>
			</div>
			<footer className=" bg-white fixed flex items-center justify-center w-1/2 bottom-0  border-t h-20 py-4">
				<div className="container flex items-center justify-end">
					<Button size="lg">Save</Button>
				</div>
			</footer>
		</div>
	);
};
