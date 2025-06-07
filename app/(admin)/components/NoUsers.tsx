import React from "react";
import Image from "next/image";

export const NoUsers = ({
	description = "You’ll find your users here once they sign up on Reenite.",
}: {
	description?: string;
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
			<p className="text-muted-foreground text-center text-base mt-4 mb-6">
				{description}
			</p>
		</div>
	);
};
