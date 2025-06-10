import { iconMap } from "@/lib/lucide-icons";
import { Wifi } from "lucide-react";
import React from "react";

export const AmenityBox = ({ icon, name }: { icon: any; name: string }) => {
	const Icon = iconMap[icon] || Wifi;
	return (
		<div className="flex items-center justify-start gap-3 text-sm md:text-base">
			<Icon className="size-5 lg:size-6" /> <p>{name}</p>
		</div>
	);
};
