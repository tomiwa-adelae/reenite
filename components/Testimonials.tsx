import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { testimonials } from "@/constants";

export const Testimonials = () => {
	return (
		<div className="bg-white pt-12 pb-16">
			<div className="container">
				<h4 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					Real stories by{" "}
					<span className="text-muted-foreground">Real people</span>
				</h4>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-8">
					{testimonials.map(
						(
							{
								image,
								name,
								testimony,
								borderColor,
								textColor,
								rotate,
								bgColor,
							},
							index
						) => (
							<div
								className={cn(
									"rounded-2xl p-8 hover:rotate-0 transition-all shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
									bgColor,
									rotate
								)}
								key={index}
							>
								<div className="flex items-center justify-start gap-4">
									<Image
										src={image}
										alt={`${name}'s picture`}
										width={1000}
										height={1000}
										className={cn(
											"rounded-full size-[70px] border-4 object-cover",
											borderColor
										)}
									/>
									<h4 className="font-medium text-lg">
										{name}
									</h4>
								</div>
								<p
									className={cn(
										"text-base leading-relaxed mt-4",
										textColor
									)}
								>
									{testimony}
								</p>
								<div className="flex items-center justify-end mt-2">
									<Quote
										className={cn("size-6", textColor)}
									/>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};
