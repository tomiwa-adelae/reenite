import Link from "next/link";
import Image from "next/image";
import { spaces } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { MoveRight } from "lucide-react";

export const ExploreSpaces = () => {
	return (
		<div className="bg-white pt-10 pb-16">
			<div className="container">
				<h4 className="font-medium text-2xl md:text-3xl lg:text-4xl text-center">
					Explore our{" "}
					<span className="text-muted-foreground">spaces</span>
				</h4>
				<ScrollArea>
					<div className="flex w-max space-x-4 pr-10 pb-4 mt-8">
						{spaces?.map(({ name, src, description }, index) => (
							<Link
								href="/"
								key={index}
								className="relative group overflow-hidden rounded-3xl max-w-[300px]"
							>
								<Image
									src={src}
									alt={`${name}'s picture`}
									width={1000}
									height={1000}
									className="w-auto h-[300px] group-hover:scale-105 transition-all object-cover rounded-4xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
								/>
								<div className="py-4">
									<h3 className="font-medium group-hover:text-secondary text-xl transition-all">
										{name}
									</h3>
									<p className="text-sm text-muted-foreground mt-1.5 truncate pr-4 mb-4">
										{description}
									</p>
									<Button asChild size="md">
										<Link href="/book">Book space</Link>
									</Button>
								</div>
							</Link>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<div className="flex items-center justify-center mt-4">
					<Button asChild size="lg" variant="secondary">
						<Link href="/book">
							Book a space today{" "}
							<Button variant="black" size="icon">
								<MoveRight />
							</Button>
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
