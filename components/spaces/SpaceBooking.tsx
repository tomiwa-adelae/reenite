import { spaceBookings } from "@/constants";
import Image from "next/image";
import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const SpaceBooking = () => {
	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">Select booking</h4>
			<ScrollArea className="mt-2">
				<div className="flex w-max pb-8 items-center justify-start gap-4">
					{spaceBookings.map(({ type, price }, index) => (
						<div key={index} className="border rounded-xl p-4">
							<div className="flex items-center justify-start gap-4">
								<Image
									src={"/assets/icons/office.svg"}
									alt="Office icon"
									width={1000}
									height={1000}
									className="size-[65px]"
								/>
								<div className="flex flex-col items-start justify-start">
									<h4 className="font-medium text-base capitalize">
										{type}
									</h4>
									<p className="text-sm text-muted-foreground">
										Book a space for a {type}
									</p>
								</div>
							</div>
							<p className="mt-2 text-center rounded-full border py-2 px-4 font-medium text-sm">
								₦{price}
								<span className="text-muted-foreground text-xs">
									/per {type}
								</span>
							</p>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
};
