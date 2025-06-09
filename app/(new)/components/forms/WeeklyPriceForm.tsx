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
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { addSpaceWeeklyPricing } from "@/lib/actions/admin/space.actions";
import { formatMoneyInput, handleKeyDown, removeCommas } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
	pricing: z.record(
		z
			.string()
			.refine((val) =>
				["1", "2", "3", "4", "5", "6", "7+"].includes(val)
			),
		z
			.string()
			.min(1, "Price is required")
			.regex(/^\d{1,3}(,\d{3})*(\.\d{1,2})?$/, "Invalid price format")
	),
});

interface Props {
	spaceId: string;
	userId: string;
	initialPricing?: Record<string, number> | null; // might come as null
}

export const WeeklyPriceForm = ({
	spaceId,
	userId,
	initialPricing = {},
}: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const defaultValues = {
		pricing: Object.fromEntries(
			["1", "2", "3", "4", "5", "6", "7+"].map((key) => [
				key,
				initialPricing?.[key]
					? formatMoneyInput(initialPricing[key].toString())
					: "",
			])
		),
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues,
	});

	const handlePriceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: any
	) => {
		let inputValue = e.target.value.replace(/[^0-9.]/g, "");
		const parts = inputValue.split(".");
		if (parts.length > 2) {
			inputValue = parts.shift() + "." + parts.join("");
		}
		if (parts[1]) {
			parts[1] = parts[1].substring(0, 2);
			inputValue = parts.join(".");
		}
		if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
			const formatted = formatMoneyInput(inputValue);
			field.onChange(formatted);
		}
	};

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		setLoading(true);
		try {
			const cleanedPricing = Object.entries(data.pricing).reduce(
				(acc, [key, val]) => {
					acc[key] = Number(removeCommas(val));
					return acc;
				},
				{} as Record<string, number>
			);

			const res = await addSpaceWeeklyPricing({
				weeklyPricing: cleanedPricing,
				userId,
				spaceId,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success(res.message);
			return router.push(
				`/all-spaces/new/${res?.space?._id}/monthly-price`
			);
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="container max-w-3xl space-y-4">
						{["1", "2", "3", "4", "5", "6", "7+"].map((count) => (
							<FormField
								key={count}
								control={form.control}
								name={`pricing.${count}`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Price for {count} user
											{count !== "1" ? "s" : ""}
										</FormLabel>
										<FormControl>
											<div className="relative">
												<span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground absolute top-[50%] translate-y-[-50%] left-[2%]">
													₦
												</span>
												<Input
													className=" min-h-20 text-3xl md:text-4xl lg:text-5xl pl-9 lg:pl-13"
													inputMode="decimal"
													value={field.value}
													onChange={(e) =>
														handlePriceChange(
															e,
															field
														)
													}
													onKeyDown={handleKeyDown}
													placeholder="0.00"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
					<Footer>
						<div className="container flex items-center justify-between gap-4">
							<Button
								className="underline"
								variant={"ghost"}
								asChild
								size="lg"
							>
								<Link
									href={`/all-spaces/new/${spaceId}/hourly-price`}
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
									"Next"
								)}
							</Button>
						</div>
					</Footer>
				</form>
			</Form>
		</div>
	);
};
