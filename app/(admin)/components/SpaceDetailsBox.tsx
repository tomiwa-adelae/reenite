import { cn } from "@/lib/utils";
import React from "react";

export const SpaceDetailsBox = ({
	name,
	children,
	active = false,
}: {
	name: string;
	active?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"cursor-pointer hover:bg-[#F7F7F7] transition-all hover:border-black border-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white p-6",
				active && "border-black bg-[#F7F7F7]"
			)}
		>
			<h3 className="font-medium text-base lg:text-lg">{name}</h3>
			{children}
		</div>
	);
};
