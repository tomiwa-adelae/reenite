"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Footer } from "@/app/(new)/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { addSpaceDescription } from "@/lib/actions/admin/space.actions";
import { Loader } from "@/components/shared/Loader";
import { ScrollArea } from "@/components/ui/scroll-area";

const FormSchema = z.object({
	description: z.string().min(2, {
		message: "Description is required.",
	}),
});

interface Props {
	userId: string;
	spaceId: string;
	description: string;
	closeSmallModal?: () => void;
}

export const EditDescriptionComponent = ({
	description,
	userId,
	spaceId,
	closeSmallModal,
}: Props) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: description || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const res = await addSpaceDescription({
				userId,
				spaceId,
				...data,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success("Description successfully updated!");
			// @ts-ignore
			closeSmallModal();
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}
	return (
		<div className="relative pt-8">
			<Header title={"Description"} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="py-8 container">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder=""
											className="resize-none min-h-40 max-h-60 text-lg md:text-2xl"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<footer className="bg-white fixed left-0 lg:left-auto flex items-center justify-center w-full lg:w-1/2 bottom-0  border-t h-20 py-4">
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
