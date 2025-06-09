"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, formatDate, formatMoneyInput } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
	noOfDays,
	noOfHours,
	noOfMonths,
	noOfUsers,
	noOfWeeks,
} from "@/constants";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

interface PricingObject {
	[key: string]: number;
}

const FormSchema = z.object({
	bookingStartDate: z.date({
		required_error: "Reservation date is required.",
	}),
	noOfHours: z.string().optional(),
	noOfDays: z.string().optional(),
	noOfWeeks: z.string().optional(),
	noOfMonths: z.string().optional(),
	noOfUsers: z.string().optional(),
});

interface Props {
	dailyPricing: PricingObject;
	hourlyPricing: PricingObject;
	weeklyPricing: PricingObject;
	monthlyPricing: PricingObject;
	dailyDiscount: string;
	hourlyDiscount: string;
	weeklyDiscount: string;
	monthlyDiscount: string;
	spaceId: string;
	booking: string;
}

export function ReservationForm({
	hourlyPricing,
	weeklyPricing,
	dailyPricing,
	monthlyPricing,
	hourlyDiscount,
	weeklyDiscount,
	dailyDiscount,
	monthlyDiscount,
	spaceId,
	booking,
}: Props) {
	const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			noOfHours: "1",
			noOfUsers: "1",
			noOfWeeks: "1",
			noOfDays: "1",
			noOfMonths: "1",
			bookingStartDate: new Date(),
		},
	});

	useEffect(() => {
		const users = form.watch("noOfUsers") || "1";
		const hours = parseInt(form.watch("noOfHours") || "1");
		const days = parseInt(form.watch("noOfDays") || "1");
		const weeks = parseInt(form.watch("noOfWeeks") || "1");
		const months = parseInt(form.watch("noOfMonths") || "1");

		let basePrice = 0;
		let discount = 0;

		switch (booking) {
			case "hourly":
				basePrice = (hourlyPricing[users] || 0) * hours;
				discount = Number(hourlyDiscount) || 0;
				break;
			case "daily":
				basePrice = (dailyPricing[users] || 0) * days;
				discount = Number(dailyDiscount) || 0;
				break;
			case "weekly":
				basePrice = (weeklyPricing[users] || 0) * weeks;
				discount = Number(weeklyDiscount) || 0;
				break;
			case "monthly":
				basePrice = (monthlyPricing[users] || 0) * months;
				discount = Number(monthlyDiscount) || 0;
				break;
			default:
				basePrice = 0;
		}

		const discountAmount = (basePrice * discount) / 100;
		const discountedPricePerUser = basePrice - discountAmount;

		setAppliedDiscount(discount);

		let numberOfUsers: number;

		if (users === "7+") {
			// Use 7 as the default for "7+"
			numberOfUsers = 7;
		} else {
			numberOfUsers = parseInt(users);
		}

		if (!isNaN(numberOfUsers)) {
			const total = numberOfUsers * discountedPricePerUser;
			setTotalPrice(total);
		} else {
			setTotalPrice(0); // Fallback
		}
	}, [
		form.watch("noOfUsers"),
		form.watch("noOfHours"),
		form.watch("noOfDays"),
		form.watch("noOfWeeks"),
		form.watch("noOfMonths"),
		booking,
		hourlyPricing,
		dailyPricing,
		weeklyPricing,
		monthlyPricing,
		hourlyDiscount,
		dailyDiscount,
		weeklyDiscount,
		monthlyDiscount,
	]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		router.push(
			`/spaces/${spaceId}/book?booking=${booking}&bookingStartDate=${formatDate(
				data.bookingStartDate
			)}&users=${data.noOfUsers}&hours=${data.noOfHours}&days=${
				data.noOfDays
			}&weeks=${data.noOfWeeks}&months=${data.noOfMonths}`
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-4 mt-4">
					{booking === "hourly" && (
						<FormField
							control={form.control}
							name="noOfHours"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of Hours</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select hours" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{noOfHours.map((hour) => (
												<SelectItem
													key={hour}
													value={hour}
												>
													{hour} hours
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{booking === "daily" && (
						<FormField
							control={form.control}
							name="noOfDays"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of days</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select days" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{noOfDays.map((day) => (
												<SelectItem
													key={day}
													value={day}
												>
													{day} days
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{booking === "weekly" && (
						<FormField
							control={form.control}
							name="noOfWeeks"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of weeks</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select weeks" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{noOfWeeks.map((week) => (
												<SelectItem
													key={week}
													value={week}
												>
													{week} weeks
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{booking === "monthly" && (
						<FormField
							control={form.control}
							name="noOfMonths"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of months</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select months" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{noOfMonths.map((month) => (
												<SelectItem
													key={month}
													value={month}
												>
													{month} months
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="noOfUsers"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Users</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={!booking}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select users" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{noOfUsers.map(({ user, label }) => (
											<SelectItem key={user} value={user}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bookingStartDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Reservation date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												disabled={!booking}
												size="md"
												variant={"outline"}
												className={cn(
													"w-full text-left text-sm font-normal rounded-lg px-3",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date <
												new Date(
													new Date().setHours(
														0,
														0,
														0,
														0
													)
												)
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="mt-2 mb-4">
					<div className="py-2 text-sm lg:text-base flex items-center justify-between gap-2 mt-4 font-semibold">
						<p>Discount:</p>
						<p>{appliedDiscount}%</p>
					</div>
					<Separator className="my-2" />
					<div className="py-2 text-base lg:text-lg flex items-center justify-between gap-2 font-semibold">
						<p>Total:</p>
						<p>₦{formatMoneyInput(totalPrice)}</p>
					</div>
				</div>
				<Button
					disabled={!booking}
					size={"lg"}
					className="w-full"
					type="submit"
				>
					Reserve space
				</Button>
			</form>
		</Form>
	);
}
