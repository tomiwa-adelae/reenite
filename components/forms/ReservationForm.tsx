"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { noOfHours } from "@/constants";

const FormSchema = z.object({
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	noOfHours: z.string({
		required_error: "Please select the number of hours.",
	}),
});

export function ReservationForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast("Event has been created.");
	}

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="noOfHours"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of hours</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a verified email to display" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{noOfHours.map((hour, index) => (
											<SelectItem
												key={index}
												value={hour}
											>
												{hour}
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
						name="dob"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Reservation date</FormLabel>
								{/* <Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											size="md"
											variant={"outline"}
											className={cn(
												"w-full text-left font-normal rounded-xl",
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
											date > new Date() ||
											date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover> */}
								<Popover>
									<PopoverTrigger asChild>
										<Button
											size="md"
											id="date"
											variant={"outline"}
											className={cn(
												"w-full justify-start text-left font-normal rounded-xl",
												!date && "text-muted-foreground"
											)}
										>
											<CalendarIcon />
											{date?.from ? (
												date.to ? (
													<>
														{format(
															date.from,
															"LLL dd, y"
														)}{" "}
														-{" "}
														{format(
															date.to,
															"LLL dd, y"
														)}
													</>
												) : (
													format(
														date.from,
														"LLL dd, y"
													)
												)
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											initialFocus
											mode="range"
											defaultMonth={date?.from}
											selected={date}
											onSelect={setDate}
											numberOfMonths={2}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="mt-2 mb-4">
					<div className="text-lg flex items-center justify-between gap-2 mt-4 font-semibold">
						<p>Discount:</p>
						<p>0%</p>
					</div>
					<div className="ext-lg flex items-center justify-between gap-2 mt-4 font-semibold">
						<p>Total:</p>
						<p>₦158,000</p>
					</div>
				</div>
				<Button size={"lg"} className="w-full" type="submit">
					Reserve space
				</Button>
			</form>
		</Form>
	);
}
