import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { availableAmenities } from "@/constants";
import { Plus, Trash2, X } from "lucide-react";
import React from "react";

export const Amenities = () => {
	return (
		<div className="py-8 container">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Amenities
				</h2>
				<Button
					size="icon"
					className="size-12 bg-[#F7F7F7]"
					variant="ghost"
				>
					<Plus className="size-6" />
				</Button>
			</div>
			<p className="text-base mt-2 text-muted-foreground">
				You’ve added these to your listing so far.
			</p>
			<div className="h-[calc(100vh-80px)] pb-32 overflow-auto">
				<ScrollArea>
					<div className="mt-8 grid grid-cols-1 gap-1">
						{availableAmenities.map(({ icon, name }, index) => {
							const Icon = icon;
							return (
								<div
									key={index}
									className="rounded-2xl p-4 flex items-center justify-between gap-2 cursor-pointer hover:border-black hover:bg-[#F7F7F7] transition-all"
								>
									<div className="flex items-start justify-center gap-2">
										<Icon className="size-6" />
										<h5 className="font-medium text-BASE">
											{name}
										</h5>
									</div>
									<Button
										size="icon"
										// className="size-12"
										variant={"destructive"}
									>
										<Trash2 className="" />
									</Button>
								</div>
							);
						})}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
