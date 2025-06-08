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
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/actions/customer/user.actions";
import { Textarea } from "@/components/ui/textarea";

interface Props {
	userId: string;
	bio: string;
}

const FormSchema = z.object({
	bio: z.string().min(2, {
		message: "Your bio is required.",
	}),
});

export const BioBox = ({ userId, bio }: Props) => {
	const [openModal, setOpenModal] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			bio: bio || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const res = await updateUserProfile({ userId, ...data });

			if (res.status === 400) return toast.error(res.message);
			toast.success("Your bio has been successfully updated.");

			setOpenModal(false);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}

	return (
		<div>
			<div>
				<h2 className="font-semibold text-2xl lg:text-3xl">About me</h2>
				<div className="mt-2 border-2 border-dashed rounded-2xl px-4 py-6">
					<p className="text-sm lg:text-base text-muted-foreground">
						{bio
							? bio
							: "Write something short and fun about yourself."}
					</p>
					{bio ? (
						<Button
							onClick={() => setOpenModal(true)}
							size="md"
							variant={"outline"}
							className="mt-1"
						>
							Edit intro
						</Button>
					) : (
						<p
							onClick={() => setOpenModal(true)}
							className="mt-1 cursor-pointer underline font-semibold hover:text-secondary text-base lg:text-lg"
						>
							Add intro
						</p>
					)}
				</div>
			</div>
			<div>
				{openModal && (
					<ResponsiveModal open={openModal}>
						<div>
							<div className="border-b pb-4 text-center md:block">
								<p className="font-semibold text-lg">
									What is your bio?
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
												name="bio"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Bio{" "}
														</FormLabel>
														<FormControl>
															<Textarea
																placeholder="Tell us a little bit about yourself, so reenite can best serve you."
																className="resize-none min-h-24"
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
													type="button"
													size="md"
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
