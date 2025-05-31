import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronRight, CreditCard } from "lucide-react";

const invoices = [
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
];

export const BookingsTable = () => {
	return (
		<Table className="mt-4">
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead>Booking ID</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Space</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow className="group h-[86px]" key={invoice.invoice}>
						<TableCell>#BK12345</TableCell>
						<TableCell>Dec 25, 2025 (3 hours)</TableCell>
						<TableCell>Mini Conference Room</TableCell>
						<TableCell>
							<Badge variant={"success"}>
								<CreditCard className="size-4 inline-block mr-2" />
								Paid
							</Badge>
						</TableCell>
						<TableCell>₦158,000</TableCell>
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
	);
};
