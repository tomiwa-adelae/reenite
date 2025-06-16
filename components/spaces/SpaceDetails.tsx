"use client";
import { AboutSpace } from "./AboutSpace";
import { Separator } from "../ui/separator";
import { SpaceBooking } from "./SpaceBooking";
import { SpaceAmenities } from "./SpaceAmenities";
import { SpaceAvailability } from "./SpaceAvailability";
import { SpaceContactInfo } from "./SpaceContactInfo";
import { ReservationForm } from "../forms/ReservationForm";
import { IAmenity, IAvailability } from "@/lib/database/models/space.model";
import { ICategory } from "@/lib/database/models/category.model";
import { useState } from "react";

interface Props {
	description: string;
	category: ICategory;
	hourlyPricing: any;
	weeklyPricing: any;
	dailyPricing: any;
	monthlyPricing: any;
	hourlyDiscount: string;
	weeklyDiscount: string;
	dailyDiscount: string;
	monthlyDiscount: string;
	spaceId: string;
	amenities: IAmenity[];
	availability: IAvailability[];
}

export const SpaceDetails = ({
	description,
	category,
	hourlyPricing,
	weeklyPricing,
	dailyPricing,
	monthlyPricing,
	hourlyDiscount,
	weeklyDiscount,
	dailyDiscount,
	monthlyDiscount,
	amenities,
	spaceId,
	availability,
}: Props) => {
	const [booking, setBooking] = useState("");

	return (
		<div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 mt-4">
			<div className="col-span-6 lg:col-span-4">
				<AboutSpace description={description} />
				<Separator className="my-4 md:my-6" />
				<SpaceBooking
					category={category}
					hourlyPricing={hourlyPricing}
					weeklyPricing={weeklyPricing}
					dailyPricing={dailyPricing}
					monthlyPricing={monthlyPricing}
					onBookingChange={(booking) => {
						setBooking(booking);
					}}
				/>
				<Separator className="mb-4 md:mb-6" />
				<SpaceAmenities amenities={amenities} />
				<Separator className="my-4 md:my-6" />
				<SpaceAvailability availability={availability} />
				<Separator className="my-4 md:my-6" />
				<SpaceContactInfo />
			</div>
			<div className="col-span-6 lg:col-span-2">
				<div className="sticky top-25 rounded-lg p-4 lg:p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
					<h4 className="text-xl md:text-2xl font-medium">
						Booking details
					</h4>
					{booking && (
						<p className="text-sm lg:text-base text-muted-foreground mt-2">
							You selected our {booking} plan
						</p>
					)}
					<ReservationForm
						hourlyPricing={hourlyPricing}
						weeklyPricing={weeklyPricing}
						dailyPricing={dailyPricing}
						monthlyPricing={monthlyPricing}
						hourlyDiscount={hourlyDiscount}
						weeklyDiscount={weeklyDiscount}
						dailyDiscount={dailyDiscount}
						monthlyDiscount={monthlyDiscount}
						booking={booking}
						spaceId={spaceId}
						category={category?.name}
					/>
				</div>
			</div>
		</div>
	);
};
