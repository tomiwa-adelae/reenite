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
import { useRouter } from "next/navigation";
import { Loader } from "@/components/shared/Loader";

const FormSchema = z.object({
	description: z.string().min(2, {
		message: "Description is required.",
	}),
});

interface Props {
	spaceId: string;
	userId: string;
	description: string;
}

export const DescriptionForm = ({ spaceId, userId, description }: Props) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: "",
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
			toast.success(res.message);
			return router.push(
				`/all-spaces/new/${res?.space?._id}/availability`
			);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}

	return (
		<div className="mt-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="container max-w-3xl space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder=""
											className="resize-none min-h-56 text-lg md:text-2xl"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Footer>
						<div className="container flex items-center justify-between gap-4">
							<Button
								className="underline"
								variant={"ghost"}
								asChild
								size="lg"
							>
								<Link href="/all-spaces/new/description">
									Back
								</Link>
							</Button>
							<Button
								type="submit"
								disabled={form.formState.isSubmitting}
								size="lg"
							>
								{form.formState.isSubmitting ? (
									<Loader />
								) : (
									"Next"
								)}
							</Button>
						</div>
					</Footer>
				</form>
			</Form>
		</div>
	);
};
