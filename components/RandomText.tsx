import Image from "next/image";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export const RandomText = () => {
	return (
		<div className="relative pb-16 flex items-center justify-center">
			<div className="container">
				<TextHoverEffect text="REENITE" />
				{/* <Image
					src={"/assets/images/red-bg.png"}
					alt="bg-image"
					width={1000}
					height={1000}
					className="absolute top-[50%] translate-y-[-50%] right-[20%] -z-10 aspect-auto size-[250px] lg:size-auto"
				/> */}
			</div>
		</div>
	);
};
