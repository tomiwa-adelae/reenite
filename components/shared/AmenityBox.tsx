import { iconMap } from "@/lib/lucide-icons";
import React from "react";

export const AmenityBox = ({ icon, name }: { icon: any; name: string }) => {
	const Icon = iconMap[icon];
	return (
		<div className="flex items-center justify-start gap-3 text-base text-muted-foreground">
			<Icon className="size-5 lg:size-6" /> <p>{name}</p>
		</div>
	);
};
