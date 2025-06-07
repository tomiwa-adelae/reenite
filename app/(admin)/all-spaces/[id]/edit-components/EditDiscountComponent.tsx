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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { handleKeyDown } from "@/lib/utils";
import { addSpaceDiscounts } from "@/lib/actions/admin/space.actions";
import { Loader } from "@/components/shared/Loader";
import { Header } from "./Header";

const FormSchema = z.object({
	hourlyDiscount: z.number().min(0).max(100),
	dailyDiscount: z.number().min(0).max(100),
	weeklyDiscount: z.number().min(0).max(100),
	monthlyDiscount: z.number().min(0).max(100),
});

const DISCOUNT_TYPES = [
	{ key: "hourlyDiscount", label: "Hourly discount" },
	{ key: "dailyDiscount", label: "Daily discount" },
	{ key: "weeklyDiscount", label: "Weekly discount" },
	{ key: "monthlyDiscount", label: "Monthly discount" },
] as const;

type DiscountKey = (typeof DISCOUNT_TYPES)[number]["key"];
type FormValues = z.infer<typeof FormSchema>;

interface Props {
	dailyDiscount: string;
	hourlyDiscount: string;
	weeklyDiscount: string;
	monthlyDiscount: string;
	userId: string;
	spaceId: string;
	closeSmallModal?: () => void;
}

export const EditDiscountComponent = ({
	userId,
	spaceId,
	dailyDiscount,
	weeklyDiscount,
	hourlyDiscount,
	monthlyDiscount,
	closeSmallModal,
}: Props) => {
	const [enabledDiscounts, setEnabledDiscounts] = useState<
		Record<DiscountKey, boolean>
	>({
		hourlyDiscount: Number(hourlyDiscount) > 0,
		dailyDiscount: Number(dailyDiscount) > 0,
		weeklyDiscount: Number(weeklyDiscount) > 0,
		monthlyDiscount: Number(monthlyDiscount) > 0,
	});
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			hourlyDiscount: isNaN(Number(hourlyDiscount))
				? 0
				: Number(hourlyDiscount),
			dailyDiscount: isNaN(Number(dailyDiscount))
				? 0
				: Number(dailyDiscount),
			weeklyDiscount: isNaN(Number(weeklyDiscount))
				? 0
				: Number(weeklyDiscount),
			monthlyDiscount: isNaN(Number(monthlyDiscount))
				? 0
				: Number(monthlyDiscount),
		},
	});

	// Disable input when checkbox is unchecked and set its value to 0
	const toggleDiscount = (key: DiscountKey) => {
		setEnabledDiscounts((prev) => {
			const updated = { ...prev, [key]: !prev[key] };
			form.setValue(key, updated[key] ? 20 : 0); // reset to 20% or 0%
			return updated;
		});
	};

	const handleDiscountChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: any,
		key: DiscountKey
	) => {
		let val = e.target.value.replace(/[^0-9]/g, ""); // only digits
		let numeric = Math.min(parseInt(val || "0", 10), 100); // clamp max 100
		form.setValue(key, numeric);
		field.onChange(numeric);
	};

	const onSubmit = async (data: FormValues) => {
		try {
			const activeDiscounts = Object.entries(data).reduce(
				(acc: any, [key, value]) => {
					if (enabledDiscounts[key as DiscountKey]) acc[key] = value;
					return acc;
				},
				{} as Partial<FormValues>
			);
			const res = await addSpaceDiscounts({
				userId,
				spaceId,
				...activeDiscounts,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success("Discount successfully updated!");
			// @ts-ignore
			closeSmallModal();
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	};
	return (
		<div className="relative pt-8">
			<Header title={"Discount"} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="lg:h-[calc(100vh-80px)] lg:pb-40 overflow-auto">
						<ScrollArea>
							<div className="container max-w-3xl space-y-6 mt-4">
								{DISCOUNT_TYPES.map(({ key, label }) => (
									<div
										key={key}
										className="rounded-xl bg-[#F7F7F7] p-4 lg:p-6 flex items-center justify-between gap-2 border"
									>
										<FormField
											control={form.control}
											name={key}
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="relative">
															<Input
																id={`${key}-input`}
																inputMode="decimal"
																onKeyDown={
																	handleKeyDown
																}
																value={
																	field.value
																}
																onChange={(e) =>
																	handleDiscountChange(
																		e,
																		field,
																		key
																	)
																}
																disabled={
																	!enabledDiscounts[
																		key
																	]
																}
																placeholder="20"
																className="text-base md:text-xl max-w-[60px] lg:max-w-[70px] focus:outline-0"
															/>
															<p className="absolute top-[50%] translate-y-[-50%] right-[8%] text-lg text-muted-foreground">
																%
															</p>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<h5 className="flex-1 text-base lg:text-lg">
											{label}
										</h5>
										<Checkbox
											checked={enabledDiscounts[key]}
											onCheckedChange={() =>
												toggleDiscount(key)
											}
											className="size-4 lg:size-6"
										/>
									</div>
								))}
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
								type="submit"
								disabled={form.formState.isSubmitting}
								size="lg"
							>
								{form.formState.isSubmitting ? (
									<Loader />
								) : (
									"Save"
								)}
							</Button>
						</div>
					</footer>
				</form>
			</Form>
		</div>
	);
};
