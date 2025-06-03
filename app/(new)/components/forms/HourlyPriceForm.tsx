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
import { addSpaceHourlyPrice } from "@/lib/actions/admin/space.actions";
import { formatMoneyInput, handleKeyDown, removeCommas } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
	hourlyPrice: z
		.string()
		.min(2, {
			message: "Hourly price is required.",
		})
		.max(32, { message: "The maximum number is 32" }),
});

interface Props {
	spaceId: string;
	userId: string;
	hourlyPrice: string;
}

export const HourlyPriceForm = ({ spaceId, userId, hourlyPrice }: Props) => {
	const router = useRouter();
	const [price, setPrice] = useState(formatMoneyInput(hourlyPrice) || "");
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			hourlyPrice: formatMoneyInput(hourlyPrice) || "",
		},
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: any
	) => {
		let inputValue = e.target.value;

		// If the input starts with a "0" and is followed by another number, remove the "0"
		if (
			inputValue.startsWith("0") &&
			inputValue.length > 1 &&
			inputValue[1] !== "."
		) {
			inputValue = inputValue.slice(1);
		}

		// Prevent the input from starting with a period
		if (inputValue.startsWith(".")) {
			return;
		}

		inputValue = inputValue.replace(/[^0-9.]/g, "");
		const parts = inputValue.split(".");
		if (parts.length > 2) {
			inputValue = parts.shift() + "." + parts.join("");
		}
		if (parts[1]) {
			parts[1] = parts[1].substring(0, 2);
			inputValue = parts.join(".");
		}

		if (/^[0-9,]*\.?[0-9]*$/.test(inputValue)) {
			const formattedValue = formatMoneyInput(inputValue);
			setPrice(formattedValue);
			field.onChange(formattedValue);
		}
	};

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const formattedPrice = removeCommas(data.hourlyPrice);
			const res = await addSpaceHourlyPrice({
				userId,
				spaceId,
				hourlyPrice: formattedPrice,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success(res.message);
			return router.push(
				`/all-spaces/new/${res?.space?._id}/daily-price`
			);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}

	return (
		<div className="mt-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="container max-w-3xl space-y-4">
						<FormField
							control={form.control}
							name="hourlyPrice"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="relative">
											<Input
												onKeyDown={handleKeyDown}
												id="decimalInput"
												inputMode="decimal"
												value={price}
												onChange={(e) =>
													handleChange(e, field)
												}
												placeholder="₦0.00"
												className="resize-none min-h-40 text-3xl md:text-4xl lg:text-5xl"
											/>
											<p className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground absolute top-[50%] translate-y-[-50%] left-[2%] ">
												₦
											</p>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
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
									href={`/all-spaces/new/${spaceId}/availability`}
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
