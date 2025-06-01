import React from "react";

export const SpaceContactInfo = () => {
	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">
				Contact information
			</h4>
			<div className="grid gap-2 underline mt-2">
				<a
					href="/"
					className="text-base hover:text-primary transition-all text-muted-foreground"
				>
					info@reenite.com
				</a>
				<a
					href="/"
					className="text-base hover:text-primary transition-all text-muted-foreground"
				>
					+234 801 364 7483
				</a>
			</div>
		</div>
	);
};
