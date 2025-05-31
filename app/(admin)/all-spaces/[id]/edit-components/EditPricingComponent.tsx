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

const FormSchema = z.object({
	hourlyPrice: z.string().min(2, {
		message: "Hourly price is required.",
	}),
	dailyPrice: z.string().min(2, {
		message: "Daily price is required.",
	}),
	monthlyPrice: z.string().min(2, {
		message: "Daily price is required.",
	}),
	weeklyPrice: z.string().min(2, {
		message: "WeeklyPrice is required.",
	}),
});

export const EditPricingComponent = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			monthlyPrice: "",
			dailyPrice: "",
			hourlyPrice: "",
			weeklyPrice: "",
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
		<div className="relative pt-8">
			<div className="container">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Pricing
				</h2>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="h-[calc(100vh-80px)] pb-40 overflow-auto">
						<ScrollArea>
							<div className="container py-8 space-y-4">
								<FormField
									control={form.control}
									name="hourlyPrice"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Hourly price{" "}
												<RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Input
													placeholder="₦0"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="dailyPrice"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Daily price <RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Input
													placeholder="₦0"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="weeklyPrice"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Weekly price</FormLabel>
											<FormControl>
												<Input
													placeholder="₦0"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="monthlyPrice"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Monthly price</FormLabel>
											<FormControl>
												<Input
													placeholder="₦0"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
