import Image from "next/image";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export const RandomText = () => {
	return (
		<div className="relative flex items-center justify-center">
			<div className="container">
				<TextHoverEffect text="REENITE" />
			</div>
		</div>
	);
};
