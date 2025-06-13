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

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export function BookingsTable({ bookings }: { bookings: IBooking[] }) {
	const router = useRouter();
	return (
		<div className="hidden md:block">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead>Booking ID</TableHead>
						<TableHead>Customer</TableHead>
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
							<TableCell>{booking?.bookingId}</TableCell>
							<TableCell>
								{booking?.user?.firstName ? (
									booking?.user?.firstName
								) : (
									<p className="italic">Deleted customer</p>
								)}{" "}
								{booking?.user?.lastName}
							</TableCell>
							<TableCell>{booking?.space?.title}</TableCell>
							<TableCell>
								{booking?.startDate} - {booking?.endDate}{" "}
								{booking?.bookingType === "hourly" &&
									`(${booking.noOfHours} ${
										booking.noOfHours === "1"
											? "hour"
											: "hours"
									})`}
								{booking.bookingType === "daily" &&
									`(${booking.noOfDays} ${
										booking.noOfDays === "1"
											? "day"
											: "days"
									})`}
								{booking.bookingType === "weekly" &&
									`(${booking?.noOfWeeks} ${
										booking?.noOfWeeks === "1"
											? "week"
											: "weeks"
									})`}
								{booking.bookingType === "monthly" &&
									`(${booking?.noOfMonths} ${
										booking?.noOfMonths === "1"
											? "month"
											: "months"
									})`}
							</TableCell>
							<TableCell>
								<div className="flex flex-col items-start capitalize justify-start h-full gap-2">
									<Badge
										variant={
											booking?.paymentStatus === "paid"
												? "success"
												: booking.paymentStatus ===
												  "failed"
												? "destructive"
												: "default"
										}
									>
										<CreditCard className="size-4 inline-block mr-2" />
										{booking?.paymentStatus}
									</Badge>
									<Badge
											variant={
											booking?.bookingStatus ===
											"confirmed"
												? "success"
												: booking?.bookingStatus ===
												  "cancelled"
												? "destructive" : booking?.bookingStatus === 'pending' ? 'warning'
												: "default"
										}
									>
										<CheckCircleIcon className="size-4 inline-block mr-2" />
										{booking?.bookingStatus}
									</Badge>
								</div>
							</TableCell>
							<TableCell>
								₦{formatMoneyInput(booking?.totalAmount)}
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
