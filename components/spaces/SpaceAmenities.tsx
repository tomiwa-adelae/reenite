import { IAmenity } from "@/lib/database/models/space.model";
import { Bike, Car, Wifi } from "lucide-react";
import React from "react";
import { AmenityBox } from "../shared/AmenityBox";

export const SpaceAmenities = ({ amenities }: { amenities: IAmenity[] }) => {
	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">Space Amenities</h4>
			<div className="grid gap-4 mt-4">
				{amenities?.map(({ icon, name }, index) => {
					return <AmenityBox key={index} name={name!} icon={icon} />;
				})}
			</div>
		</div>
	);
};
