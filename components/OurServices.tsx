import { Wifi } from "lucide-react";
import { ourServices } from "@/constants";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export const OurServices = () => {
	return (
		<div className="bg-white py-12">
			<div className="container">
				<h4 className="font-medium text-2xl md:text-3xl lg:text-4xl text-center">
					Work in Peace,{" "}
					<span className="text-muted-foreground">
						Thrive in Comfort
					</span>
				</h4>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{ourServices.map(({ icon, title, description }, index) => {
						const Icon = icon;
						return (
							<div
								key={index}
								className="rounded-lg px-8 py-12 items-start flex flex-col relative justify-start shadow-[0_3px_10px_rgb(0,0,0,0.2)] group hover:bg-primary hover:text-white transition-all"
							>
								{/* <GlowingEffect
							blur={0}
							borderWidth={3}
							spread={80}
							glow={true}
							disabled={false}
							proximity={64}
							inactiveZone={0.01}
						/> */}
								<div className="flex items-center justify-start p-4 rounded-full bg-primary/10 text-primary group-hover:bg-white group-hover:text-secondary transition-all">
									<Icon className="size-6" />
								</div>
								<h3 className="text-xl font-medium mt-4 mb-1">
									{title}
								</h3>
								<p className="text-muted-foreground leading-loose text-base group-hover:text-white transition-all">
									{description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
