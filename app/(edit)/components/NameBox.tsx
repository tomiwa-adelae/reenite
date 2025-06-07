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
import { CircleUser } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/customer/user.actions";

interface Props {
	userId: string;
	firstName: string;
	lastName: string;
}

const FormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name is required.",
	}),
	lastName: z.string().min(2, {
		message: "Last name is required.",
	}),
});

export const NameBox = ({ userId, firstName, lastName }: Props) => {
	const [openModal, setOpenModal] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: firstName || "",
			lastName: lastName || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			console.log({ ...data });

			const res = await updateUserProfile({ userId, ...data });

			if (res.status === 400) return toast.error(res.message);
			toast.success("Your name has been successfully updated.");

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
				<CircleUser className="size-6 lg:size-7" />{" "}
				<p className="text-sm lg:text-base line-clamp-1">
					My name:{" "}
					<span className="text-black">
						{firstName} {lastName}
					</span>
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
												name="firstName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															First name{" "}
														</FormLabel>
														<FormControl>
															<Input
																placeholder="John"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Last name{" "}
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Doe"
																{...field}
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
