import { IAvailability } from "@/lib/database/models/space.model";
import React from "react";
import { format, parse } from "date-fns";

export const SpaceAvailability = ({
	availability,
}: {
	availability: IAvailability[];
}) => {
	const formattedAvailability = availability
		.filter((item: any) => item.isOpen)
		.map((item: any) => {
			const day = item.day.charAt(0).toUpperCase() + item.day.slice(1);
			const openTime = format(
				parse(item.openingHour, "HH:mm", new Date()),
				"hh:mm a"
			);
			const closeTime = format(
				parse(item.closingHour, "HH:mm", new Date()),
				"hh:mm a"
			);
			return `${day}: ${openTime} to ${closeTime}`;
		});

	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">
				Space Availability
			</h4>
			<div className="grid gap-4 mt-4">
				{formattedAvailability.map((entry, idx) => (
					<p
						className="text-sm lg:text-base text-muted-foreground"
						key={idx}
					>
						{entry}
					</p>
				))}
			</div>
		</div>
	);
};
