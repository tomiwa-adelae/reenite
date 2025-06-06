import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const lucideIcons = Object.entries(Icons).filter(
	([, Component]) =>
		typeof Component === "function" && "displayName" in Component
) as [string, LucideIcon][];

import {
	Car,
	Snowflake,
	Printer,
	Wifi,
	Lightbulb,
	CookingPot,
	Video,
	Shield,
	Phone,
} from "lucide-react";

export const iconMap: Record<string, React.ElementType> = {
	Car,
	Snowflake,
	Printer,
	Wifi,
	Lightbulb,
	CookingPot,
	Video,
	Shield,
	Phone,
};
