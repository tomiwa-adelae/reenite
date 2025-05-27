import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SHOWCASE_VIDEO_URL } from "@/constants";

export const Showcase = () => {
	return (
		<div className="min-h-[85vh] relative py-16 flex items-center justify-center">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
			>
				<source src={SHOWCASE_VIDEO_URL} type="video/mp4" />
			</video>
			<div className="grid container text-white text-center h-full">
				<div className="z-20 flex items-center justify-center flex-col">
					<h1
						style={{ fontFamily: "ClashDisplay" }}
						className="text-4xl lg:text-7xl mb-6 font-bold"
					>
						Your Productive Space Awaits
					</h1>
					<p className="text-base font-medium mb-4 md:w-7/12 mx-auto">
						Book a serene, modern workspace to focus, meet, or
						create. Join us at Reenite and be part of a community
						driving innovation in Uyo and beyond.
					</p>
					<Button size="lg" asChild variant="secondary">
						<Link href="/book">Book a space</Link>
					</Button>
				</div>
			</div>
			<div className="absolute inset-0 bg-black/40" />
		</div>
	);
};
