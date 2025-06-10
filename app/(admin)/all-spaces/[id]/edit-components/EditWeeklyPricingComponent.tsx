"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "./Header";
import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";

import { formatMoneyInput, handleKeyDown, removeCommas } from "@/lib/utils";
import {
	addSpaceWeeklyPricing,
	updateSpacePricing,
} from "@/lib/actions/admin/space.actions";
import { Loader } from "@/components/shared/Loader";
import { useState } from "react";

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
	userId: string;
	spaceId: string;
	initialPricing?: Record<string, number> | null; // might come as null
	closeSmallModal?: () => void;
}

export const EditWeeklyPricingComponent = ({
	userId,
	spaceId,
	initialPricing = {},
	closeSmallModal,
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
			toast.success("Weekly pricing successfully updated!");
			// ✅ Safely call modal closer
			if (typeof closeSmallModal === "function") {
				closeSmallModal();
			}
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative pt-8">
			<Header title={"Weekly pricing"} />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="lg:h-[calc(100vh-80px)] lg:pb-40 pb-12 overflow-auto">
						<ScrollArea>
							<div className="container py-8 space-y-4">
								{["1", "2", "3", "4", "5", "6", "7+"].map(
									(count) => (
										<FormField
											key={count}
											control={form.control}
											name={`pricing.${count}`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Price for {count} user
														{count !== "1"
															? "s"
															: ""}
													</FormLabel>
													<FormControl>
														<div className="relative">
															<span className="text-muted-foreground absolute top-[50%] translate-y-[-50%] left-[2%]">
																₦
															</span>
															<Input
																className="pl-6"
																inputMode="decimal"
																value={
																	field.value
																}
																onChange={(e) =>
																	handlePriceChange(
																		e,
																		field
																	)
																}
																onKeyDown={
																	handleKeyDown
																}
																placeholder="0.00"
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
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
