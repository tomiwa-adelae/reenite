import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const NoSpaces = ({
	description = "You’ll find your spaces here after you’ve created your first space on Reenite.",
	showButton = true,
}: {
	description?: any;
	showButton?: boolean;
}) => {
	return (
		<div className="mt-4 flex flex-col items-center justify-center">
			<Image
				src={"/assets/icons/folder.svg"}
				alt="Folder icon"
				width={1000}
				height={1000}
				className="size-[250px] object-cover"
			/>
			<p className="text-muted-foreground text-center text-sm md:text-base mt-4 mb-6">
				{description}
			</p>
			{showButton && (
				<Button asChild size="md" variant="secondary">
					<Link href="/all-spaces/new">Create a space</Link>
				</Button>
			)}
		</div>
	);
};
