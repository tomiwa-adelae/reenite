import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_PROFILE_PICTURE, DEFAULT_SPACE_IMAGE } from "@/constants";
import { IBooking } from "@/lib/database/models/booking.model";
import Image from "next/image";
import Link from "next/link";

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
						className="group relative"
						href={`/all-bookings/${booking._id}`}
						key={index}
					>
						<div className="relative">
							<Image
								src={coverPhoto.src || DEFAULT_SPACE_IMAGE}
								alt={booking?.space?.title || "Space image"}
								width={1000}
								height={1000}
								className="aspect-video object-cover rounded-lg"
							/>
							<Image
								src={
									booking?.user?.picture! ||
									DEFAULT_PROFILE_PICTURE
								}
								alt={
									`${booking?.user?.firstName}'s` ||
									"User profile picture"
								}
								width={1000}
								height={1000}
								className="aspect-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute bottom-[2%] right-[2%] size-[60px] object-cover rounded-full"
							/>
						</div>
						<h4 className="text-lg font-medium mt-4">
							{booking?.bookingId}
						</h4>
						<p className="text-sm text-muted-foreground">
							{booking?.space?.title}
						</p>
						<Separator className="my-2" />
						<h4 className="text-base font-medium group-hover:text-secondary transition-all">
							{booking?.user?.firstName ? (
								booking?.user?.firstName
							) : (
								<p className="italic">Deleted user</p>
							)}{" "}
							{booking?.user?.lastName}
						</h4>
						<p className="text-sm text-muted-foreground">
							{booking?.user?.email}
						</p>
						<div className="absolute top-3 left-2 flex items-center justify-start gap-2">
							<Badge
								variant={
									booking?.paymentStatus === "paid"
										? "success"
										: booking?.paymentStatus === "failed"
										? "destructive"
										: "default"
								}
								className=" capitalize"
							>
								{booking?.paymentStatus}
							</Badge>
							<Badge
								variant={
									booking?.bookingStatus === "confirmed"
										? "success"
										: booking?.bookingStatus === "cancelled"
										? "destructive"
										: "default"
								}
								className="capitalize"
							>
								{booking?.bookingStatus}
							</Badge>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
