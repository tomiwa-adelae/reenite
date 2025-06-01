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
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
	monthlyPrice: z
		.string()
		.min(2, {
			message: "Monthly price is required.",
		})
		.max(32, { message: "The maximum number is 32" }),
});

export const MonthlyPriceForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			monthlyPrice: "",
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

	return (
		<div className="mt-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="container max-w-3xl space-y-4">
						<FormField
							control={form.control}
							name="monthlyPrice"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder="₦0"
											className="resize-none min-h-40 text-3xl md:text-4xl lg:text-5xl"
											{...field}
										/>
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
								<Link href="/all-spaces/new/weekly-price">
									Back
								</Link>
							</Button>
							<Button asChild size="lg" type="submit">
								<Link href="/all-spaces/new/discount">
									Next
								</Link>
							</Button>
						</div>
					</Footer>
				</form>
			</Form>
		</div>
	);
};
