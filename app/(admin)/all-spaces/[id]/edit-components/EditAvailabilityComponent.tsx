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
import { useEffect, useState } from "react";
import { IAvailability } from "@/lib/database/models/space.model";
import { addSpaceAvailability } from "@/lib/actions/admin/space.actions";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/shared/Loader";
import { Header } from "./Header";

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
	userId: string;
	spaceId: string;
	availability: IAvailability[];
	closeSmallModal?: () => void;
}

export const EditAvailabilityComponent = ({
	userId,
	spaceId,
	availability,
	closeSmallModal,
}: Props) => {
	const mapAvailabilityToFormData = (
		availability: IAvailability[]
	): OperatingHours => {
		const days: Day[] = [
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
			"sunday",
		];

		const availabilityMap: Partial<OperatingHours> = {};

		for (const day of days) {
			const match = availability.find(
				(item: any) => item.day.toLowerCase() === day
			);
			availabilityMap[day] = {
				open: match?.openingHour || "",
				close: match?.closingHour || "",
				closed: !match?.isOpen,
			};
		}

		return availabilityMap as OperatingHours;
	};
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [formData, setFormData] = useState<{
		operatingHours: OperatingHours;
	}>({
		operatingHours: mapAvailabilityToFormData(availability),
	});

	useEffect(() => {
		if (availability && availability.length) {
			setFormData({
				operatingHours: mapAvailabilityToFormData(availability),
			});
		}
	}, [availability]);

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

			// toast.success(res.message);
			setLoading(false);
			toast.success("Space availability successfully updated!");
			// @ts-ignore
			closeSmallModal();
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative pt-8">
			<Header title={"Space availability"} />
			<div className="lg:h-[calc(100vh-80px)] lg:pb-40 pb-16 overflow-auto">
				<ScrollArea>
					<div className="space-y-3 container mt-4">
						{Object.entries(formData.operatingHours).map(
							([day, hours]) => (
								<div
									key={day}
									className="flex flex-col items-center space-x-4 rounded-xl bg-[#F7F7F7] p-4 lg:p-6 border"
								>
									<div className="flex items-center justify-between gap-4 w-full">
										<div className="text-sm md:text-base font-medium capitalize">
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
												className="rounded border-gray-300 text-primary text-sm md:text-base"
											/>
											<label
												htmlFor={day}
												className="text-xs ms:text-sm font-medium text-muted-foreground"
											>
												Open
											</label>
										</div>
									</div>

									{!hours.closed && (
										<div className="w-full flex items-center justify-between gap-2">
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
												className="border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
											/>
											<span className="text-xs md:text-sm text-muted-foreground">
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
												className="border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
											/>
										</div>
									)}
								</div>
							)
						)}
					</div>
				</ScrollArea>
			</div>
			<footer className=" bg-white fixed left-0 lg:left-auto flex items-center justify-center w-full lg:w-1/2 bottom-0  border-t h-20 py-4">
				<div className="container flex items-center justify-between lg:justify-end">
					<Button
						onClick={closeSmallModal}
						type="submit"
						size={"lg"}
						variant={"ghost"}
						className="lg:hidden"
					>
						Close
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={
							Object.values(formData.operatingHours).every(
								(day) => day.closed
							) || loading
						}
						size="lg"
					>
						{loading ? <Loader /> : "Save"}
					</Button>
				</div>
			</footer>
		</div>
	);
};
