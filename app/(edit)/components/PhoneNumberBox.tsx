"use client";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
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
import { CircleUser, Phone } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/customer/user.actions";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

interface Props {
	userId: string;
	phoneNumber: string;
}

const FormSchema = z.object({
	phoneNumber: z
		.string()
		.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
		.refine(isValidPhoneNumber, {
			message: "Invalid phone number",
		})
		.optional(),
});

export const PhoneNumberBox = ({ userId, phoneNumber }: Props) => {
	const [openModal, setOpenModal] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			phoneNumber: phoneNumber || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const res = await updateUserProfile({ userId, ...data });

			if (res.status === 400) return toast.error(res.message);
			toast.success("Your phone number has been successfully updated.");

			setOpenModal(false);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}

	return (
		<div>
			<div
				onClick={() => setOpenModal(true)}
				className="flex items-center justify-start gap-2 border-b py-6 hover:rounded-lg hover:bg-muted px-4 cursor-pointer transition-all text-muted-foreground"
			>
				<Phone className="size-6 lg:size-7" />{" "}
				<p className="text-sm lg:text-base line-clamp-1">
					My phone: <span className="text-black">{phoneNumber}</span>
				</p>
			</div>
			<div>
				{openModal && (
					<ResponsiveModal open={openModal}>
						<div>
							<div className="border-b pb-4 text-center md:block">
								<p className="font-semibold text-lg">
									What is your phone number?
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
												name="phoneNumber"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Phone number{" "}
														</FormLabel>
														<FormControl>
															<PhoneInput
																placeholder="0801 234 5679"
																value={
																	field.value
																}
																defaultCountry="NG"
																className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 sm:text-sm text-base"
																onChange={(
																	phone
																) => {
																	field.onChange(
																		phone
																	);
																}}
															/>
														</FormControl>
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
