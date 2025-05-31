import React from "react";
import { SpaceImages } from "./SpaceImages";
import { Separator } from "../ui/separator";
import { Bike, Car, Wifi } from "lucide-react";
import Link from "next/link";
import { SpaceBooking } from "./SpaceBooking";
import { ReservationForm } from "../forms/ReservationForm";

interface Props {
	images: any;
}

export const SpaceDetails = ({ images }: Props) => {
	return (
		<div className="bg-white py-8 relative">
			<div className="container">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					Mini Conference Room
				</h2>
				<p className="text-sm lg:text-base text-muted-foreground mt-2">
					300 Adeola Odeku St, Victoria Island, Lagos 101241, Lagos
				</p>
				<SpaceImages images={images} />
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-6">
					<div className="col-span-4">
						<div>
							<h4 className="text-xl md:text-2xl font-medium">
								About space
							</h4>
							<p className="text-base text-muted-foreground mt-2">
								From workshops and training seminars to company
								celebrations – our office environments are
								outfitted with the essentials to help meet your
								business needs. Reenite offers flexible
								workspace solutions that cater to companies of
								all sizes, providing a great work environment
								for enhanced productivity and success.
							</p>
						</div>
						<Separator className="my-8" />
						<SpaceBooking />
						<Separator className="mt-4 mb-8" />
						<div>
							<h4 className="text-xl md:text-2xl font-medium">
								Space Amenities
							</h4>
							<div className="grid gap-4 mt-4">
								<div className="flex items-center justify-start gap-4">
									<Wifi className="size-7" />{" "}
									<p className="text-base">Wifi</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Car className="size-7" />{" "}
									<p className="text-base">Free parking</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Bike className="size-7" />{" "}
									<p className="text-base">Bike parking</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Wifi className="size-7" />{" "}
									<p className="text-base">Wifi</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Car className="size-7" />{" "}
									<p className="text-base">Free parking</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Bike className="size-7" />{" "}
									<p className="text-base">Bike parking</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Wifi className="size-7" />{" "}
									<p className="text-base">Wifi</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Car className="size-7" />{" "}
									<p className="text-base">Free parking</p>
								</div>
								<div className="flex items-center justify-start gap-4">
									<Bike className="size-7" />{" "}
									<p className="text-base">Bike parking</p>
								</div>
							</div>
						</div>
						<Separator className="my-8" />
						<div>
							<h4 className="text-xl md:text-2xl font-medium">
								Contact information
							</h4>
							<div className="grid gap-2 underline mt-2">
								<a
									href="/"
									className="text-base hover:text-primary transition-all text-muted-foreground"
								>
									info@reenite.com
								</a>
								<a
									href="/"
									className="text-base hover:text-primary transition-all text-muted-foreground"
								>
									+234 801 364 7483
								</a>
							</div>
						</div>
					</div>
					<div className="col-span-3 lg:col-span-2">
						<div className="sticky top-25 rounded-2xl p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
							<h4 className="text-xl md:text-2xl font-medium">
								Booking details
							</h4>
							<p className="text-base text-muted-foreground mb-4">
								You selected: Monthly plan
							</p>
							<ReservationForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
