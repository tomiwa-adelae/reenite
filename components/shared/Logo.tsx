import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
	return (
		<Link href="/spaces" className="group">
			<Image
				src={"/assets/images/logo-full.svg"}
				alt="Reenite full logo in it's blue color"
				width={1000}
				height={1000}
				className="group-hover:hidden w-[130px] md:w-[160px]"
			/>
			<Image
				src={"/assets/images/logo-full-grey.svg"}
				alt="Reenite full logo in it's grey color"
				width={1000}
				height={1000}
				className="hidden group-hover:block w-[130px] md:w-[160px]"
			/>
		</Link>
	);
};

export const WhiteLogo = () => {
	return (
		<Link href="/" className="group">
			<Image
				src={"/assets/images/logo-full-white.svg"}
				alt="Reenite full logo in it's blue color"
				width={1000}
				height={1000}
				className="group-hover:hidden w-[150px] md:w-[160px]"
			/>
			<Image
				src={"/assets/images/logo-full-grey.svg"}
				alt="Reenite full logo in it's grey color"
				width={1000}
				height={1000}
				className="hidden group-hover:block w-[150px] md:w-[160px]"
			/>
		</Link>
	);
};
