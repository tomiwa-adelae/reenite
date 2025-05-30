import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const lucideIcons = Object.entries(Icons).filter(
	([, Component]) =>
		typeof Component === "function" && "displayName" in Component
) as [string, LucideIcon][];
