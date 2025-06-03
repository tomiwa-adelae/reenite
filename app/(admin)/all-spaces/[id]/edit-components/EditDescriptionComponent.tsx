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
}

export const EditDescriptionComponent = ({
	description,
	userId,
	spaceId,
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
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}
	return (
		<div className="relative pt-8">
			<div className="container">
				<h2 className="font-semibold text-muted-foreground text-3xl lg:text-3xl">
					Description
				</h2>
			</div>
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
					<footer className="bg-white fixed flex items-center justify-center w-1/2 bottom-0  border-t h-20 py-4">
						<div className="container flex items-center justify-end">
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
