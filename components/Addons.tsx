import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Addons = () => {
	return (
		<div className="bg-[#E8DDDA] py-16">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
				<Image
					src={"/assets/images/parfait.png"}
					alt="Parfiat"
					width={1000}
					height={1000}
					className="size-full"
				/>
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-3xl lg:text-5xl leading-snug mb-3 font-semibold text-secondary">
						Enjoy Fresh Parfait While You Work
					</h2>
					<p className="text-base italic font-medium leading-loose mb-4">
						Take a break, recharge, and enjoy our delicious homemade
						parfait, made fresh daily with layers of creamy yogurt,
						fruits, granola, and love. Available for order right
						inside the space because work feels better with good
						food.
					</p>
					<Button asChild size="lg">
						<Link href="/book">Join us today</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
