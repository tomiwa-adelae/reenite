import { Separator } from "@/components/ui/separator";
import { DEFAULT_PROFILE_PICTURE, DEFAULT_SPACE_IMAGE } from "@/constants";
import { IBooking } from "@/lib/database/models/booking.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const BookingsGrid = ({ bookings }: { bookings: IBooking[] }) => {
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{bookings?.map((booking: any, index) => {
				const coverPhoto =
					// @ts-ignore
					booking.space?.photos.find((photo) => photo.cover) ||
					// @ts-ignore
					booking.space?.photos[0];
				return (
					<Link
						className="group"
						href={`/all-bookings/${booking._id}`}
						key={index}
					>
						<div className="relative">
							<Image
								src={coverPhoto.src || DEFAULT_SPACE_IMAGE}
								alt={booking?.space?.title || "Space image"}
								width={1000}
								height={1000}
								className="aspect-video object-cover rounded-2xl"
							/>
							<Image
								src={
									booking?.user?.picture! ||
									DEFAULT_PROFILE_PICTURE
								}
								alt={``}
								width={1000}
								height={1000}
								className="aspect-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute bottom-[2%] right-[2%] size-[60px] object-cover rounded-full"
							/>
						</div>
						<h4 className="text-lg font-medium mt-4">
							{booking?.space?.title}
						</h4>
						<p className="text-sm text-muted-foreground">
							{booking?.space?.city}, {booking?.space?.state}
						</p>
						<Separator className="my-2" />
						<h4 className="text-base font-medium group-hover:text-secondary transition-all">
							{booking?.user?.firstName} {booking?.user?.lastName}
						</h4>
						<p className="text-sm text-muted-foreground">
							{booking?.user?.email}
						</p>
						{/* <div className="flex items-center justify-start gap-2 mt-4">
							<Image
								src={"/assets/images/user-one.jpeg"}
								alt={"User"}
								width={1000}
								height={1000}
								className="size-[30px] object-cover rounded-full"
							/>
							<div>
								<h4 className="text-base font-medium">
									Adelae Tomiwa
								</h4>
							</div>
						</div> */}
					</Link>
				);
			})}
		</div>
	);
};
