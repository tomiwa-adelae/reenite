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
import { Loader } from "@/components/shared/Loader";
import { addSpaceLocation } from "@/lib/actions/admin/space.actions";
import { Header } from "./Header";

const FormSchema = z.object({
	country: z.string().min(2, {
		message: "Country is required.",
	}),
	address: z.string().min(2, {
		message: "Address is required.",
	}),
	city: z.string().min(2, {
		message: "City is required.",
	}),
	state: z.string().min(2, {
		message: "State is required.",
	}),
	zipCode: z.string().min(2, {
		message: "Zipcode is required.",
	}),
});

interface Props {
	userId: string;
	spaceId: string;
	address: string;
	state: string;
	city: string;
	country: string;
	zipCode: string;
	closeSmallModal?: () => void;
}

export const EditLocationComponent = ({
	address,
	city,
	state,
	country,
	zipCode,
	userId,
	spaceId,
	closeSmallModal,
}: Props) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			country: country || "",
			city: city || "",
			state: state || "",
			address: address || "",
			zipCode: zipCode || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const res = await addSpaceLocation({
				userId,
				spaceId,
				...data,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success("Location successfully updated!");
			// ✅ Safely call modal closer
			if (typeof closeSmallModal === "function") {
				closeSmallModal();
			}
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}
	return (
		<div className="relative pt-8">
			<Header title={"Location"} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="lg:h-[calc(100vh-80px)] lg:pb-40 pb-12 overflow-auto">
						<ScrollArea>
							<div className="container py-8 space-y-4">
								<FormField
									control={form.control}
									name="address"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Address <RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Input
													placeholder="123 Main Street"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												City <RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Ikeja"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="zipCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Zip code</FormLabel>
											<FormControl>
												<Input
													placeholder="100001"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												State <RequiredAsterisk />
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select your state" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{nigerianStates.map(
														(state, index) => (
															<SelectItem
																key={index}
																value={state}
															>
																{state}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Country <RequiredAsterisk />
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="capitalize">
														<SelectValue placeholder="nigeria" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{nigerianCountries.map(
														(country, index) => (
															<SelectItem
																key={index}
																value={country}
															>
																{country}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
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
								size={"lg"}
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
