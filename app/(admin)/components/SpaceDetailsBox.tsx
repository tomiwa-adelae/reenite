import React from "react";

export const SpaceDetailsBox = ({
	name,
	children,
}: {
	name: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="cursor-pointer hover:bg-[#F7F7F7] transition-all hover:border-black border-2 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white p-6">
			<h3 className="font-medium text-base lg:text-lg">{name}</h3>
			{children}
		</div>
	);
};
