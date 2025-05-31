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

const FormSchema = z.object({
	hourlyDiscount: z
		.number()
		.min(2, {
			message: "Discount is required.",
		})
		.max(100, { message: "The maximum number is 100" }),
	dailyDiscount: z
		.number()
		.min(2, {
			message: "Discount is required.",
		})
		.max(100, { message: "The maximum number is 100" }),
	weeklyDiscount: z
		.number()
		.min(2, {
			message: "Discount is required.",
		})
		.max(100, { message: "The maximum number is 100" }),
	monthlyDiscount: z
		.number()
		.min(2, {
			message: "Discount is required.",
		})
		.max(100, { message: "The maximum number is 100" }),
});

export const DiscountForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {},
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
					<div className="container max-w-3xl space-y-6">
						<div className="rounded-xl bg-[#F7F7F7]  p-6 flex items-center justify-between gap-2 border">
							<FormField
								control={form.control}
								name="hourlyDiscount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="border-2 rounded-xl flex items-center justify-center pr-2">
												<Input
													placeholder="20"
													className="text-base border-none md:text-xl max-w-[50px] lg:max-w-[60px] focus:outline-0"
													{...field}
												/>
												<h5 className="font-medium text-lg">
													%
												</h5>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h5 className="flex-1 text-base lg:text-lg">
								Hourly discount
							</h5>
							<Checkbox
								className="size-6"
								id="terms-2"
								defaultChecked
							/>
						</div>
						<div className="rounded-xl bg-[#F7F7F7]  p-6 flex items-center justify-between gap-2 border">
							<FormField
								control={form.control}
								name="dailyDiscount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="border-2 rounded-xl flex items-center justify-center pr-2">
												<Input
													placeholder="20"
													className="text-base border-none md:text-xl max-w-[50px] lg:max-w-[60px] focus:outline-0"
													{...field}
												/>
												<h5 className="font-medium text-lg">
													%
												</h5>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h5 className="flex-1 text-base lg:text-lg">
								Daily discount
							</h5>
							<Checkbox
								className="size-6"
								id="terms-2"
								defaultChecked
							/>
						</div>
						<div className="rounded-xl bg-[#F7F7F7]  p-6 flex items-center justify-between gap-2 border">
							<FormField
								control={form.control}
								name="weeklyDiscount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="border-2 rounded-xl flex items-center justify-center pr-2">
												<Input
													placeholder="20"
													className="text-base border-none md:text-xl max-w-[50px] lg:max-w-[60px] focus:outline-0"
													{...field}
												/>
												<h5 className="font-medium text-lg">
													%
												</h5>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h5 className="flex-1 text-base lg:text-lg">
								Weekly discount
							</h5>
							<Checkbox
								className="size-6"
								id="terms-2"
								defaultChecked
							/>
						</div>
						<div className="rounded-xl bg-[#F7F7F7]  p-6 flex items-center justify-between gap-2 border">
							<FormField
								control={form.control}
								name="monthlyDiscount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="border-2 rounded-xl flex items-center justify-center pr-2">
												<Input
													placeholder="20"
													className="text-base border-none md:text-xl max-w-[50px] lg:max-w-[60px] focus:outline-0"
													{...field}
												/>
												<h5 className="font-medium text-lg">
													%
												</h5>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h5 className="flex-1 text-base lg:text-lg">
								Monthly discount
							</h5>
							<Checkbox
								className="size-6"
								id="terms-2"
								defaultChecked
							/>
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
								<Link href="/all-spaces/new/structure">
									Back
								</Link>
							</Button>
							<Button size="lg" type="submit">
								Create space
							</Button>
						</div>
					</Footer>
				</form>
			</Form>
		</div>
	);
};
