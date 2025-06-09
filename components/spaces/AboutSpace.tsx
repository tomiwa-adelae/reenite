import React from "react";

export const AboutSpace = ({ description }: { description: string }) => {
	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">About space</h4>
			<p className="text-base mt-2 leading-relaxed">{description}</p>
		</div>
	);
};
