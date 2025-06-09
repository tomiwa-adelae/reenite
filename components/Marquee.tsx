import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export const Marquee = ({ texts }: { texts: any }) => {
	return (
		<div className="marquee-section bg-gradient-to-r from-[#1B1D37] via-[#2d3748] to-[#1a202c] border-b-2 border-t-2 border-t-[#667eea] border-b-[#764ba2] relative overflow-hidden py-8">
			<div className="whitespace-nowrap overflow-hidden">
				<div className="marquee-content inline-block will-change-transform">
					{texts.map((text: any, index: any) => (
						<span
							key={index}
							className="inline-block text-sm md:text-base lg:text-lg font-semibold text-white mx-4 lg:mx-8 uppercase transition-all cursor-pointer marquee-text hover:text-secondary hover:scale-105"
						>
							{text}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
