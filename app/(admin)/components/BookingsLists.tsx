import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IBooking } from "@/lib/database/models/booking.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { Badge } from "@/components/ui/badge";

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
						href={`/all-bookings/${booking._id}`}
						className="hover:bg-[#F7F7F7] transition-all p-2 rounded-lg flex items-center justify-start gap-4 group cursor-pointer relative"
					>
						<Image
							src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
							alt={booking?.space?.title || "Space image"}
							width={1000}
							height={1000}
							className="size-[70px] object-cover rounded-lg"
						/>
						<div className="flex-1 flex items-center justify-between gap-2">
							<div className="flex-1">
								<h5 className="text-base font-medium line-clamp-1">
									{booking?.bookingId}
								</h5>
								<p className="text-sm text-muted-foreground">
									{booking?.space?.title}
								</p>
							</div>
							<Button variant={"ghost"} size="icon">
								<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
							</Button>
						</div>
						<Badge
							variant={
								booking?.paymentStatus === "paid"
									? "success"
									: booking?.paymentStatus === "failed"
									? "destructive"
									: "default"
							}
							className="absolute top-3 left-3 capitalize px-1 py-1 rounded-full"
						/>
					</Link>
				);
			})}
		</div>
	);
};
