import Link from "next/link";
import Image from "next/image";
import { spaces } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { MoveRight } from "lucide-react";

export const ExploreSpaces = () => {
	return (
		<div className="bg-white py-16">
			<div>
				<div className="container">
					<h4 className="font-semibold text-2xl lg:text-4xl text-center">
						Explore our{" "}
						<span className="text-muted-foreground">spaces</span>
					</h4>
					<ScrollArea>
						<div className="flex w-max space-x-4 pr-10 pb-4 mt-8">
							{spaces?.map(({ name, image }, index) => (
								<Link
									href="/"
									key={index}
									className="relative group overflow-hidden rounded-3xl"
								>
									<Image
										src={image}
										alt={`${name}'s picture`}
										width={1000}
										height={1000}
										className="size-[300px] group-hover:scale-105 transition-all object-cover rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
									/>
									<div className="py-4">
										<h3 className="font-medium group-hover:text-secondary text-xl transition-all">
											{name}
										</h3>
										<p className="text-sm text-muted-foreground mt-1.5">
											Secluded, secure and fully furnished
										</p>
									</div>
								</Link>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
					<div className="flex items-center justify-center mt-8">
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
		</div>
	);
};
