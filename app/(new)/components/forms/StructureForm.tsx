import React from "react";
import { Footer } from "@/app/(new)/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { spaceCategories } from "@/constants";

export const StructureForm = () => {
	return (
		<div>
			<div className="container max-w-3xl">
				<div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
					{spaceCategories.map(({ icon, name }, index) => (
						<div
							key={index}
							className="border-2 rounded-xl p-6 flex flex-col items-start justify-center gap-2 cursor-pointer hover:border-black hover:border-2 transition-all"
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
			<Footer>
				<div className="container flex items-center justify-between gap-4">
					<Button
						className="underline"
						variant={"ghost"}
						asChild
						size="lg"
					>
						<Link href="/all-spaces/new/structure">Back</Link>
					</Button>
					<Button size="lg">Next</Button>
				</div>
			</Footer>
		</div>
	);
};
