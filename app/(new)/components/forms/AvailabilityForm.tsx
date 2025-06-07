"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Footer } from "@/app/(new)/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader } from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { addSpaceAvailability } from "@/lib/actions/admin/space.actions";

type Day =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

type OperatingHours = {
	[day in Day]: {
		open: string;
		close: string;
		closed: boolean;
	};
};

interface Props {
	spaceId: string;
	userId: string;
	availability: string;
}

export const AvailabilityForm = ({ spaceId, userId, availability }: Props) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [formData, setFormData] = useState<{
		operatingHours: OperatingHours;
	}>({
		operatingHours: {
			monday: { open: "08:00", close: "18:00", closed: false },
			tuesday: { open: "08:00", close: "18:00", closed: false },
			wednesday: { open: "08:00", close: "18:00", closed: false },
			thursday: { open: "08:00", close: "18:00", closed: false },
			friday: { open: "08:00", close: "18:00", closed: false },
			saturday: { open: "09:00", close: "17:00", closed: false },
			sunday: { open: "", close: "", closed: true },
		},
	});

	const handleOperatingHoursChange = (
		day: Day,
		field: "open" | "close" | "closed",
		value: string | boolean
	) => {
		setFormData((prev) => ({
			...prev,
			operatingHours: {
				...prev.operatingHours,
				[day]: {
					...prev.operatingHours[day],
					[field]: value,
				},
			},
		}));
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const allClosed = Object.values(formData.operatingHours).every(
				(day) => day.closed
			);

			if (allClosed) {
				toast.error("At least one day must be open.");
				return;
			}

			const availabilityPayload = Object.entries(
				formData.operatingHours
			).map(([day, values]) => ({
				day,
				openingHour: values.open,
				closingHour: values.close,
				isOpen: !values.closed,
			}));

			const res = await addSpaceAvailability({
				userId,
				spaceId,
				availability: availabilityPayload,
			});

			if (res.status === 400) return toast.error(res.message);

			toast.success(res.message);
			setLoading(false);
			return router.push(
				`/all-spaces/new/${res?.space?._id}/hourly-price`
			);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-8">
			<div className="container max-w-3xl space-y-6">
				<div className="space-y-3">
					{Object.entries(formData.operatingHours).map(
						([day, hours]) => (
							<div
								key={day}
								className="flex flex-col items-center space-x-4 rounded-xl bg-[#F7F7F7] p-4 lg:p-6 border"
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
													day as Day,
													"closed",
													!e.target.checked
												)
											}
											className="rounded border-gray-300 text-primary text-sm lg:text-base"
										/>
										<label
											htmlFor={day}
											className="text-sm lg:text-base font-medium text-muted-foreground"
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
													day as Day,
													"open",
													e.target.value
												)
											}
											className="border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
										/>
										<span className="text-sm lg:text-base text-muted-foreground">
											to
										</span>
										<Input
											type="time"
											value={hours.close}
											onChange={(e) =>
												handleOperatingHoursChange(
													day as Day,
													"close",
													e.target.value
												)
											}
											className="border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm lg:text-base"
										/>
									</div>
								)}
							</div>
						)
					)}
				</div>
			</div>
			<Footer>
				<div className="container flex items-center justify-between gap-4">
					<Button
						className="underline"
						variant={"ghost"}
						asChild
						size="lg"
					>
						<Link href={`/all-spaces/new/${spaceId}/description`}>
							Back
						</Link>
					</Button>
					<Button
						disabled={
							Object.values(formData.operatingHours).every(
								(day) => day.closed
							) || loading
						}
						onClick={handleSubmit}
						size="lg"
						type="submit"
					>
						{loading ? <Loader /> : "Next"}
					</Button>
				</div>
			</Footer>
		</div>
	);
};
