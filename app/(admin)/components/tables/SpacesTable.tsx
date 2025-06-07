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
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IPhoto, ISpace } from "@/lib/database/models/space.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { formatMoneyInput } from "@/lib/utils";

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

export function SpacesTable({ spaces }: { spaces: ISpace[] }) {
	const router = useRouter();
	return (
		<div className="hidden md:block">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead>Space</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Location</TableHead>
						<TableHead className="text-right">Amount</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{spaces.map((space, index) => {
						const coverPhoto =
							// @ts-ignore
							space?.photos.find((photo) => photo.cover) ||
							// @ts-ignore
							space?.photos[0];
						return (
							<TableRow
								onClick={() =>
									router.push(`/all-spaces/${space._id}`)
								}
								className="group"
								key={index}
							>
								<TableCell className="flex items-center justify-start gap-4">
									<Image
										src={
											coverPhoto.src ||
											DEFAULT_SPACE_IMAGE
										}
										alt={"Space"}
										width={1000}
										height={1000}
										className="size-[70px] object-cover rounded-2xl"
									/>
									<h5 className="font-medium text-base">
										{space?.title}
									</h5>
								</TableCell>
								<TableCell>
									{/* @ts-ignore */}
									{space?.category?.name || "Uncategorized"}
								</TableCell>
								<TableCell>
									{space?.city}, {space?.state}
								</TableCell>
								<TableCell className="text-right">
									₦
									{formatMoneyInput(
										// @ts-ignore
										space.pricing?.hourly["1"]
									)}
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-end">
										<Button variant={"ghost"} size="icon">
											<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
