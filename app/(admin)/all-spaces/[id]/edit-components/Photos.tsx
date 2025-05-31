import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export const Photos = () => {
	return (
		<div className="py-8 container">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Space photos
				</h2>
				<Button
					size="icon"
					className="size-12 bg-[#F7F7F7]"
					variant="ghost"
				>
					<Plus className="size-6" />
				</Button>
			</div>
			<div className="h-[calc(100vh-80px)] pb-32 overflow-auto">
				<ScrollArea>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
						<div className="group overflow-hidden rounded-xl">
							<Image
								src={"/assets/images/space-one.jpg"}
								alt={"Space"}
								width={1000}
								height={1000}
								className="rounded-xl object-cover aspect-auto hover:scale-[102%] transition-all cursor-pointer"
							/>
						</div>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
