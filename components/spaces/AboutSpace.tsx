import React from "react";

export const AboutSpace = ({ description }: { description: string }) => {
	return (
		<div>
			<div>
				<h4 className="text-xl md:text-2xl font-medium">About space</h4>
				<p className="text-base text-muted-foreground mt-2">
					{description}
				</p>
			</div>
		</div>
	);
};
