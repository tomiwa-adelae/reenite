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
import { handleKeyDown } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSpaceDiscounts } from "@/lib/actions/admin/space.actions";
import { Loader } from "@/components/shared/Loader";

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
	spaceId: string;
	userId: string;
	dailyDiscount: any;
	weeklyDiscount: any;
	hourlyDiscount: any;
	monthlyDiscount: any;
}

export const DiscountForm = ({
	spaceId,
	userId,
	hourlyDiscount,
	weeklyDiscount,
	monthlyDiscount,
	dailyDiscount,
}: Props) => {
	const router = useRouter();
	const [enabledDiscounts, setEnabledDiscounts] = useState<
		Record<DiscountKey, boolean>
	>({
		hourlyDiscount: true,
		dailyDiscount: true,
		weeklyDiscount: true,
		monthlyDiscount: true,
	});
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			hourlyDiscount: Number(hourlyDiscount) || 10,
			dailyDiscount: Number(dailyDiscount) || 10,
			weeklyDiscount: Number(weeklyDiscount) || 10,
			monthlyDiscount: Number(monthlyDiscount) || 10,
		},
	});

	// Disable input when checkbox is unchecked and set its value to 0
	const toggleDiscount = (key: DiscountKey) => {
		setEnabledDiscounts((prev) => {
			const updated = { ...prev, [key]: !prev[key] };
			form.setValue(key, updated[key] ? 10 : 0); // reset to 20% or 0%
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
			const allDiscounts = Object.entries(data).reduce(
				(acc, [key, value]) => {
					acc[key as DiscountKey] = String(
						enabledDiscounts[key as DiscountKey] ? value : 0
					);
					return acc;
				},
				{} as Record<DiscountKey, string>
			);
			const res = await addSpaceDiscounts({
				userId,
				spaceId,
				...allDiscounts,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success(res.message);
			return router.push(`/all-spaces/${res?.space?._id}?success=true`);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	};
	return (
		<div className="mt-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="container max-w-3xl space-y-4">
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
														value={field.value}
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
									onCheckedChange={() => toggleDiscount(key)}
									className="size-4 lg:size-6"
								/>
							</div>
						))}
					</div>

					<Footer>
						<div className="container flex items-center justify-between gap-4">
							<Button
								className="underline"
								variant="ghost"
								asChild
								size="lg"
							>
								<Link
									href={`/all-spaces/new/${spaceId}/monthly-price`}
								>
									Back
								</Link>
							</Button>
							<Button
								type="submit"
								disabled={form.formState.isSubmitting}
								size="lg"
							>
								{form.formState.isSubmitting ? (
									<Loader />
								) : (
									"Create space"
								)}
							</Button>
						</div>
					</Footer>
				</form>
			</Form>
		</div>
	);
};
