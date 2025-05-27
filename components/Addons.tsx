import Image from "next/image";

export const Addons = () => {
	return (
		<div className="bg-[#E8DDDA] py-16">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
				<Image
					src={"/assets/images/parfait.png"}
					alt="Parfiat"
					width={1000}
					height={1000}
					className="size-auto"
				/>
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-2xl lg:text-4xl mb-6 font-semibold text-secondary">
						Enjoy Fresh Parfait While You Work
					</h2>
					<p className="text-base italic font-medium">
						Take a break, recharge, and enjoy our delicious homemade
						parfait, made fresh daily with layers of creamy yogurt,
						fruits, granola, and love. Available for order right
						inside the space because work feels better with good
						food.
					</p>
				</div>
			</div>
		</div>
	);
};
