"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePaystackPayment } from "react-paystack";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
	noOfHours as numberOfHours,
	noOfDays as numberOfDays,
	noOfWeeks as numberOfWeeks,
	noOfMonths as numberOfMonths,
	noOfUsers as numberOfUsers,
} from "@/constants";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBooking } from "@/lib/actions/customer/booking.actions";

interface PricingObject {
	[key: string]: number;
}

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	noOfHours: string;
	noOfDays: string;
	noOfWeeks: string;
	noOfMonths: string;
	noOfUsers: string;
	booking: string;
	bookingStartDate: string;
	discount: string;
	pricing: PricingObject;
	spaceId: string;
	userId: string;
}

export const BookingDetails = ({
	firstName,
	lastName,
	discount,
	email,
	phoneNumber,
	noOfHours,
	noOfDays,
	noOfWeeks,
	noOfMonths,
	noOfUsers,
	booking,
	bookingStartDate,
	pricing,
	spaceId,
	userId,
}: Props) => {
	const router = useRouter();

	const [newHours, setNewHours] = useState(noOfHours || "");
	const [newDays, setNewDays] = useState(noOfDays || "");
	const [newWeeks, setNewWeeks] = useState(noOfWeeks || "");
	const [newMonths, setNewMonths] = useState(noOfMonths || "");
	const [newUsers, setNewUsers] = useState(noOfUsers || "");
	const [totalPrice, setTotalPrice] = useState<any>(0);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		console.log(pricing, discount);

		const numbers =
			booking === "hourly"
				? newHours
				: booking === "daily"
				? newDays
				: booking === "weekly"
				? newWeeks
				: newMonths;

		console.log(numbers);

		let basePrice = (pricing[newUsers] || 0) * Number(numbers);
		const discountAmount = (basePrice * Number(discount)) / 100;

		setTotalPrice(basePrice - discountAmount);
	}, [booking, discount, newUsers, newWeeks, newDays, newMonths, newHours]);

	// Move this hook out of the handleSubmit function
	const config = {
		reference: new Date().getTime().toString(),
		email,
		amount: totalPrice * 100, // Convert to kobo
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		metadata: {
			name: `${firstName} ${lastName}`,
			custom_fields: [
				{
					display_name: "Full Name",
					variable_name: "full_name",
					value: `${firstName} ${lastName}`,
				},
				{
					display_name: "Phone Number",
					variable_name: "phone_number",
					value: phoneNumber,
				},
			],
		},
	};

	const onSuccess = async (reference: any) => {
		try {
			setLoading(true);
			const details = {
				spaceId,
				userId,
				trxref: reference.trxref,
				transactionId: reference.transaction,
				paymentStatus:
					reference.status === "success" ? "paid" : "failed",
				bookingStatus: "confirmed",
				noOfHours,
				noOfWeeks,
				noOfDays,
				noOfMonths,
				noOfUsers,
				totalAmount: totalPrice,
				bookingStartDate,
				bookingType: booking,
			};

			const res = await createBooking({ ...details });

			if (res.status === 400) return toast.error(res.message);

			toast.success(res.message);
			setLoading(false);

			router.push(
				`/spaces/${spaceId}/book/success?id=${res?.booking?._id}`
			);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
			toast.error("An error occurred! Try again later");
		}
	};

	const onClose = () => {
		console.log("Payment closed");
	};

	const initializePayment = usePaystackPayment(config);

	const handleSubmit = () => {
		initializePayment({
			onSuccess,
			onClose,
		});
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
			<div className="col-span-4">
				<h4 className="text-xl md:text-2xl font-medium mb-2">
					Contact details
				</h4>
				<div className="mt-4 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label className="mb-2">First name</Label>
							<Input
								placeholder="John"
								disabled
								value={firstName}
							/>
						</div>
						<div>
							<Label className="mb-2">Last name</Label>
							<Input
								placeholder="John"
								disabled
								value={lastName}
							/>
						</div>
					</div>
					<div>
						<Label className="mb-2">Email</Label>
						<Input
							placeholder="john@gmail.com"
							disabled
							value={email}
						/>
					</div>
					{booking === "hourly" && (
						<div>
							<Label className="mb-2">Number of hours</Label>
							<Select
								value={newHours}
								onValueChange={(value) => setNewHours(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select hours" />
								</SelectTrigger>
								<SelectContent>
									{numberOfHours.map((hour, index) => (
										<SelectItem key={index} value={hour}>
											{hour}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
					{booking === "daily" && (
						<div>
							<Label className="mb-2">Number of days</Label>
							<Select
								value={newDays}
								onValueChange={(value) => setNewDays(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select days" />
								</SelectTrigger>
								<SelectContent>
									{numberOfDays.map((day, index) => (
										<SelectItem key={index} value={day}>
											{day}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
					{booking === "weekly" && (
						<div>
							<Label className="mb-2">Number of weeks</Label>
							<Select
								value={newWeeks}
								onValueChange={(value) => setNewWeeks(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select weeks" />
								</SelectTrigger>
								<SelectContent>
									{numberOfWeeks.map((week, index) => (
										<SelectItem key={index} value={week}>
											{week}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
					{booking === "monthly" && (
						<div>
							<Label className="mb-2">Number of months</Label>
							<Select
								value={newMonths}
								onValueChange={(value) => setNewMonths(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select monthly" />
								</SelectTrigger>
								<SelectContent>
									{numberOfMonths.map((month, index) => (
										<SelectItem key={index} value={month}>
											{month}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
					<div>
						<Label className="mb-2">Number of users</Label>
						<Select
							value={newUsers}
							onValueChange={(value) => setNewUsers(value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select users" />
							</SelectTrigger>
							<SelectContent>
								{numberOfUsers.map(({ user, label }, index) => (
									<SelectItem key={index} value={user}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<div className="col-span-4 lg:col-span-2">
				<div className="sticky top-25 rounded-2xl p-4 lg:p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
					<h4 className="text-xl md:text-2xl font-medium">
						Booking details
					</h4>
					<div className="py-2 text-sm lg:text-base mt-4 flex items-center justify-between gap-2">
						<p>Starting date:</p>
						<p>{formatDate(bookingStartDate)}</p>
					</div>
					<Separator className="my-2" />
					<div className="py-2 text-sm lg:text-base flex items-center justify-between gap-2">
						<p className="capitalize">{booking} Price:</p>
						<p className="capitalize">
							₦{formatMoneyInput(pricing["1"])}
						</p>
					</div>
					<Separator className="my-2" />
					<div className="py-2 text-sm lg:text-base flex items-center justify-between gap-2">
						<p>Discount:</p>
						<p>{discount}%</p>
					</div>
					<Separator className="my-2" />
					<div className="py-2 text-lg flex items-center justify-between gap-2 font-semibold">
						<p>Total:</p>
						<p>₦{formatMoneyInput(totalPrice)}</p>
					</div>
					<Button
						onClick={handleSubmit}
						className="w-full mt-4"
						size="lg"
						disabled={loading}
					>
						{loading ? "Processing..." : "Confirm & Pay"}
					</Button>
				</div>
			</div>
		</div>
	);
};
