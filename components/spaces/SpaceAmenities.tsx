import { Bike, Car, Wifi } from "lucide-react";
import React from "react";

export const SpaceAmenities = () => {
	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">Space Amenities</h4>
			<div className="grid gap-4 mt-4">
				<div className="flex items-center justify-start gap-4">
					<Wifi className="size-7" />{" "}
					<p className="text-base">Wifi</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Car className="size-7" />{" "}
					<p className="text-base">Free parking</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Bike className="size-7" />{" "}
					<p className="text-base">Bike parking</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Wifi className="size-7" />{" "}
					<p className="text-base">Wifi</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Car className="size-7" />{" "}
					<p className="text-base">Free parking</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Bike className="size-7" />{" "}
					<p className="text-base">Bike parking</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Wifi className="size-7" />{" "}
					<p className="text-base">Wifi</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Car className="size-7" />{" "}
					<p className="text-base">Free parking</p>
				</div>
				<div className="flex items-center justify-start gap-4">
					<Bike className="size-7" />{" "}
					<p className="text-base">Bike parking</p>
				</div>
			</div>
		</div>
	);
};
