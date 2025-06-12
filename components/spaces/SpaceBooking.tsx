"use client";
import { spaceBookings } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ICategory } from "@/lib/database/models/category.model";
import { cn, formatMoneyInput } from "@/lib/utils";

interface PricingObject {
	[key: string]: number;
}

interface Props {
	dailyPricing: PricingObject;
	hourlyPricing: PricingObject;
	weeklyPricing: PricingObject;
	monthlyPricing: PricingObject;
	category: ICategory;
	onBookingChange: (bookingType: string) => void;
}

const bookingOptions = [
	{
		label: "hourly",
		description: "Book a space for an hour",
		priceKey: "hourlyPricing",
	},
	{
		label: "daily",
		description: "Book a space for a day",
		priceKey: "dailyPricing",
	},
	{
		label: "weekly",
		description: "Book a space for a week",
		priceKey: "weeklyPricing",
	},
	{
		label: "monthly",
		description: "Book a space for a month",
		priceKey: "monthlyPricing",
	},
];

export const SpaceBooking = ({
	hourlyPricing,
	weeklyPricing,
	dailyPricing,
	monthlyPricing,
	category,
	onBookingChange,
}: Props) => {
	const prices: Record<string, PricingObject> = {
		hourlyPricing,
		dailyPricing,
		weeklyPricing,
		monthlyPricing,
	};

	const [selectBooking, setSelectBooking] = useState("");

	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">Select booking</h4>
			<ScrollArea className="mt-2">
				<div className="flex w-max pb-8 items-center justify-start gap-4">
					{bookingOptions?.map(
						({ label, description, priceKey }, index) => (
							<div
								onClick={() => {
									setSelectBooking(label);
									onBookingChange(label);
								}}
								key={index}
								className={cn(
									"border-2 rounded-lg cursor-pointer hover:bg-[#F7F7F7] transition-all p-4 hover:border-black",
									selectBooking === label &&
										"border-black bg-[#F7F7F7]"
								)}
							>
								<div className="flex items-center justify-start gap-4">
									<Image
										src={
											category?.image ||
											"/assets/icons/office.svg"
										}
										alt={`${label} icon`}
										width={1000}
										height={1000}
										className="size-[45px] md:size-[65px]"
									/>
									<div className="flex flex-col items-start justify-start">
										<h4 className="Capitalize font-medium text-sm md:text-base capitalize">
											{label}
										</h4>
										<p className="text-xs md:text-sm text-muted-foreground">
											{description}
										</p>
									</div>
								</div>
								<p className="mt-2 text-center rounded-full border py-2 px-4 font-medium text-xs md:text-sm">
									₦{formatMoneyInput(prices[priceKey]["1"])}
									<span className="text-muted-foreground text-xs">
										/ per user
									</span>
								</p>
							</div>
						)
					)}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
};
