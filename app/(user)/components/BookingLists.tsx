import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IBooking } from "@/lib/database/models/booking.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";

export const BookingsLists = ({ bookings }: { bookings: IBooking[] }) => {
	return (
		<div className="md:hidden">
			{bookings?.map((booking: any, index) => {
				const coverPhoto =
					// @ts-ignore
					booking.space?.photos.find((photo) => photo.cover) ||
					// @ts-ignore
					booking.space?.photos[0];
				return (
					<Link
						key={index}
						href={`/bookings/${booking._id}`}
						className="hover:bg-[#F7F7F7] transition-all p-2 rounded-2xl flex items-center justify-start gap-4 group cursor-pointer"
					>
						<Image
							src={coverPhoto.src || DEFAULT_SPACE_IMAGE}
							alt={booking.space.title || "Space image"}
							width={1000}
							height={1000}
							className="size-[70px] object-cover rounded-2xl"
						/>
						<div className="flex-1 flex items-center justify-between gap-2">
							<div className="flex-1">
								<h5 className="text-base font-medium">
									{booking.bookingId} - {booking.space.title}
								</h5>
								<p className="text-sm text-muted-foreground">
									{booking.space.city} {booking.space.state}
								</p>
							</div>
							<Button variant={"ghost"} size="icon">
								<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
							</Button>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
