"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { nigerianCountries, nigerianStates } from "@/constants";
import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FormSchema = z.object({
	country: z.string().min(2, {
		message: "Country is required.",
	}),
	address: z.string().min(2, {
		message: "Address is required.",
	}),
	city: z.string().min(2, {
		message: "City is required.",
	}),
	state: z.string().min(2, {
		message: "State is required.",
	}),
	zipCode: z.string().min(2, {
		message: "Zipcode is required.",
	}),
});

export const EditAvailabilityComponent = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			country: "",
			city: "",
			state: "",
			address: "",
			zipCode: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});
	}

	const [formData, setFormData] = useState({
		// Basic Information
		title: "",
		description: "",
		category: "",
		capacity: "",

		// Location & Contact
		address: "",
		city: "",
		state: "",
		zipCode: "",
		contactPhone: "",
		contactEmail: "",

		// Pricing & Availability
		hourlyRate: "",
		dailyRate: "",
		monthlyRate: "",
		isAvailable: true,
		operatingHours: {
			monday: { open: "08:00", close: "18:00", closed: false },
			tuesday: { open: "08:00", close: "18:00", closed: false },
			wednesday: { open: "08:00", close: "18:00", closed: false },
			thursday: { open: "08:00", close: "18:00", closed: false },
			friday: { open: "08:00", close: "18:00", closed: false },
			saturday: { open: "09:00", close: "17:00", closed: false },
			sunday: { open: "", close: "", closed: true },
		},

		// Features & Amenities
		amenities: [],
		features: [],

		// Media
		images: [],
		virtualTourUrl: "",

		// Settings
		isFeatured: false,
		requiresApproval: false,
		instantBooking: true,
		minimumBookingHours: "1",
		maximumBookingHours: "8",
		cancellationPolicy: "flexible",
	});

	const handleOperatingHoursChange = (day: any, field: any, value: any) => {
		setFormData((prev) => ({
			...prev,
			operatingHours: {
				...prev.operatingHours,
				[day]: {
					// @ts-ignore
					...prev.operatingHours[day],
					[field]: value,
				},
			},
		}));
	};

	return (
		<div className="relative pt-8">
			<div className="container">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Space availability
				</h2>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="h-[calc(100vh-80px)] pb-40 overflow-auto">
						<ScrollArea>
							<div className="container py-8 space-y-4">
								<div className="space-y-2">
									{Object.entries(
										formData.operatingHours
									).map(([day, hours]) => (
										<div
											key={day}
											className="flex flex-col items-center space-x-4 rounded-2xl bg-[#F7F7F7] p-6 border"
										>
											<div className="flex items-center justify-between gap-4 w-full">
												<div className="text-base lg:text-lg font-medium capitalize">
													{day}
												</div>
												<div className="flex items-center space-x-1">
													<input
														id={day}
														type="checkbox"
														checked={!hours.closed}
														onChange={(e) =>
															handleOperatingHoursChange(
																day,
																"closed",
																!e.target
																	.checked
															)
														}
														className="rounded-2xl border-gray-300 text-primary"
													/>
													<label
														htmlFor={day}
														className="text-base font-medium  text-muted-foreground"
													>
														Open
													</label>
												</div>
											</div>
											{!hours.closed && (
												<div className="w-full flex items-center justify-between gap-2 mt-4">
													<Input
														type="time"
														value={hours.open}
														onChange={(e) =>
															handleOperatingHoursChange(
																day,
																"open",
																e.target.value
															)
														}
														className="border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
													/>
													<span className="text-base text-muted-foreground">
														to
													</span>
													<Input
														type="time"
														value={hours.close}
														onChange={(e) =>
															handleOperatingHoursChange(
																day,
																"close",
																e.target.value
															)
														}
														className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</ScrollArea>
					</div>
					<footer className=" bg-white fixed flex items-center justify-center w-1/2 bottom-0  border-t h-20 py-4">
						<div className="container flex items-center justify-end">
							<Button size="lg">Save</Button>
						</div>
					</footer>
				</form>
			</Form>
		</div>
	);
};
