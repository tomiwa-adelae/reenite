import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_PROFILE_PICTURE, DEFAULT_SPACE_IMAGE } from "@/constants";
import { IBooking } from "@/lib/database/models/booking.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const BookingsGrid = ({ bookings }: { bookings: IBooking[] }) => {
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
			{bookings?.map((booking: any, index) => {
				const coverPhoto =
					// @ts-ignore
					booking.space?.photos.find((photo) => photo.cover) ||
					// @ts-ignore
					booking.space?.photos[0];
				return (
					<Link
						className="group relative"
						href={`/bookings/${booking._id}`}
						key={index}
					>
						<Image
							src={coverPhoto.src || DEFAULT_SPACE_IMAGE}
							alt={booking?.space?.title || "Space image"}
							width={1000}
							height={1000}
							className="aspect-video object-cover rounded-lg"
						/>
						<h4 className="text-lg font-medium mt-4">
							{booking.bookingId}
						</h4>
						<p className="text-sm text-muted-foreground">
							{booking?.space?.title}
						</p>
						<div className="absolute top-3 left-3 flex items-start capitalize justify-start h-full gap-2">
							<Badge
								variant={
									booking?.paymentStatus === "paid"
										? "success"
										: booking.paymentStatus === "failed"
										? "destructive"
										: "default"
								}
							>
								{booking.paymentStatus}
							</Badge>
							<Badge
								variant={
									booking?.bookingStatus === "confirmed"
										? "success"
										: booking?.bookingStatus === "cancelled"
										? "destructive"
										: "default"
								}
							>
								{booking.bookingStatus}
							</Badge>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
