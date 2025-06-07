"use client";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CircleUser, MapPin, MapPinHouse } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/customer/user.actions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { nigerianCountries, nigerianStates } from "@/constants";

interface Props {
	userId: string;
	address: string;
	city: string;
	state: string;
	country: string;
}

const FormSchema = z.object({
	address: z.string().min(2, {
		message: "Address is required.",
	}),
	city: z.string().min(2, {
		message: "City is required.",
	}),
	state: z.string().min(2, {
		message: "State is required.",
	}),
	country: z.string().min(2, {
		message: "Country is required.",
	}),
});

export const LocationBox = ({
	userId,
	address,
	city,
	state,
	country,
}: Props) => {
	const [openModal, setOpenModal] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			address: address || "",
			city: city || "",
			state: state || "",
			country: country || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			console.log({ ...data });

			const res = await updateUserProfile({ userId, ...data });

			if (res.status === 400) return toast.error(res.message);
			toast.success("Your location has been successfully updated.");

			setOpenModal(false);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}

	return (
		<div>
			<div
				onClick={() => setOpenModal(true)}
				className="flex items-center justify-start gap-4 border-b py-6 hover:rounded-2xl hover:bg-muted px-4 cursor-pointer transition-all text-muted-foreground"
			>
				<MapPinHouse className="size-6 lg:size-7" />{" "}
				<p className="text-sm lg:text-base line-clamp-1">
					My location:{" "}
					<span className="text-black">{address}...</span>
				</p>
			</div>
			<div>
				{openModal && (
					<ResponsiveModal open={openModal}>
						<div>
							<div className="border-b pb-4 text-center md:block">
								<p className="font-semibold text-lg">
									What is your name?
								</p>
							</div>
							<div className="pb-8 pt-8 mb-16 px-6 flex flex-col items-center justify-center">
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="w-full"
									>
										<div className="space-y-4">
											<FormField
												control={form.control}
												name="address"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Address{" "}
														</FormLabel>
														<FormControl>
															<Input
																placeholder="123 main street"
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
															City{" "}
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Lagos"
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
															State
														</FormLabel>
														<Select
															onValueChange={(
																value
															) => {
																field.onChange(
																	value
																);
															}}
															defaultValue={
																field.value
															}
														>
															<FormControl>
																<SelectTrigger className="capitalize">
																	<SelectValue placeholder="Select your state" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{nigerianStates.map(
																	(
																		state,
																		index
																	) => (
																		<SelectItem
																			key={
																				index
																			}
																			value={
																				state
																			}
																		>
																			{
																				state
																			}
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
															Country
														</FormLabel>
														<Select
															onValueChange={(
																value
															) => {
																field.onChange(
																	value
																);
															}}
															defaultValue={
																field.value
															}
														>
															<FormControl>
																<SelectTrigger className="capitalize">
																	<SelectValue placeholder="Nigeria" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{nigerianCountries.map(
																	(
																		country,
																		index
																	) => (
																		<SelectItem
																			key={
																				index
																			}
																			value={
																				country
																			}
																		>
																			{
																				country
																			}
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
										<div className="fixed left-0 bg-white min-h-16 py-4 bottom-0 w-full border-t">
											<div className="px-6 flex items-center justify-between gap-4 ">
												<Button
													onClick={() => {
														setOpenModal(false);
													}}
													size="md"
													type="button"
													variant={"ghost"}
													disabled={
														form.formState
															.isSubmitting
													}
												>
													Cancel
												</Button>
												<Button
													type="submit"
													disabled={
														form.formState
															.isSubmitting
													}
													size="md"
												>
													{form.formState
														.isSubmitting ? (
														<Loader />
													) : (
														"Save"
													)}
												</Button>
											</div>
										</div>
									</form>
								</Form>
							</div>
						</div>
					</ResponsiveModal>
				)}
			</div>
		</div>
	);
};
