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

export const EditDiscountComponent = () => {
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
		<div className="relative pt-8">
			<div className="container">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Discount
				</h2>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="h-[calc(100vh-80px)] pb-40 overflow-auto">
						<ScrollArea>
							<div className="container py-8 space-y-4">
								<div className="rounded-2xl bg-[#F7F7F7]  p-4 flex items-center justify-between gap-2 border">
									<FormField
										control={form.control}
										name="hourlyDiscount"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="border-2 rounded-2xl flex items-center justify-center pr-2">
														<Input
															placeholder="20"
															className="text-base border-none md:text-base max-w-[50px] lg:max-w-[60px] focus:outline-0"
															{...field}
														/>
														<h5 className="font-medium text-base">
															%
														</h5>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<h5 className="flex-1 text-base">
										Hourly discount
									</h5>
									<Checkbox
										className="size-5"
										id="terms-2"
										defaultChecked
									/>
								</div>
								<div className="rounded-2xl bg-[#F7F7F7]  p-4 flex items-center justify-between gap-2 border">
									<FormField
										control={form.control}
										name="dailyDiscount"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="border-2 rounded-2xl flex items-center justify-center pr-2">
														<Input
															placeholder="20"
															className="text-base border-none md:text-base max-w-[50px] lg:max-w-[60px] focus:outline-0"
															{...field}
														/>
														<h5 className="font-medium text-base">
															%
														</h5>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<h5 className="flex-1 text-base">
										Daily discount
									</h5>
									<Checkbox
										className="size-5"
										id="terms-2"
										defaultChecked
									/>
								</div>
								<div className="rounded-xl bg-[#F7F7F7]  p-4 flex items-center justify-between gap-2 border">
									<FormField
										control={form.control}
										name="weeklyDiscount"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="border-2 rounded-2xl flex items-center justify-center pr-2">
														<Input
															placeholder="20"
															className="text-base border-none md:text-base max-w-[50px] lg:max-w-[60px] focus:outline-0"
															{...field}
														/>
														<h5 className="font-medium text-base">
															%
														</h5>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<h5 className="flex-1 text-base">
										Weekly discount
									</h5>
									<Checkbox
										className="size-5"
										id="terms-2"
										defaultChecked
									/>
								</div>
								<div className="rounded-2xl bg-[#F7F7F7]  p-4 flex items-center justify-between gap-2 border">
									<FormField
										control={form.control}
										name="monthlyDiscount"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="border-2 rounded-2xl flex items-center justify-center pr-2">
														<Input
															placeholder="20"
															className="text-base border-none md:text-base max-w-[50px] lg:max-w-[60px] focus:outline-0"
															{...field}
														/>
														<h5 className="font-medium text-base">
															%
														</h5>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<h5 className="flex-1 text-base">
										Monthly discount
									</h5>
									<Checkbox
										className="size-5"
										id="terms-2"
										defaultChecked
									/>
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
