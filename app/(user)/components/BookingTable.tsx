"use client";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	CheckCheckIcon,
	CheckCircleIcon,
	ChevronRight,
	CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IBooking } from "@/lib/database/models/booking.model";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatMoneyInput } from "@/lib/utils";

export function BookingsTable({ bookings }: { bookings: IBooking[] }) {
	const router = useRouter();
	return (
		<div className="hidden md:block">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead>Booking ID</TableHead>
						<TableHead>Space</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bookings.map((booking: any, index) => (
						<TableRow
							className="group h-[86px]"
							key={index}
							onClick={() =>
								router.push(`/all-bookings/${booking._id}`)
							}
						>
							<TableCell>{booking.bookingId}</TableCell>
							<TableCell>{booking.space.title}</TableCell>
							<TableCell>
								{formatDate(booking.startDate)}{" "}
								{booking.bookingType === "hourly" &&
									`(${booking.noOfHours} ${
										booking.noOfHours === 1
											? "hour"
											: "hours"
									})`}
							</TableCell>
							<TableCell>
								<div className="flex items-center capitalize justify-start h-full gap-2">
									<Badge>
										<CreditCard className="size-4 inline-block mr-2" />
										{booking.paymentStatus}
									</Badge>
									<Badge>
										<CheckCircleIcon className="size-4 inline-block mr-2" />
										{booking.bookingStatus}
									</Badge>
								</div>
							</TableCell>
							<TableCell>
								₦{formatMoneyInput(booking.totalAmount)}
							</TableCell>
							<TableCell>
								<div className="flex items-center justify-end">
									<Button variant={"ghost"} size="icon">
										<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
