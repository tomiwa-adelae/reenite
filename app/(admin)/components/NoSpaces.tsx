import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const NoSpaces = () => {
	return (
		<div className="mt-4 flex flex-col items-center justify-center">
			<Image
				src={"/assets/icons/folder.svg"}
				alt="Folder icon"
				width={1000}
				height={1000}
				className="size-[250px] object-cover"
			/>
			<p className="text-muted-foreground text-center text-base mt-4 mb-6">
				You’ll find your spaces here after you’ve created your first
				space on Reenite.
			</p>
			<Button asChild size="md" variant="secondary">
				<Link href="/all-spaces/new">Create a space</Link>
			</Button>
		</div>
	);
};
