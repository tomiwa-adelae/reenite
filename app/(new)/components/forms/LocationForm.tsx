"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import React from "react";
import { Footer } from "@/app/(new)/components/Footer";
import Image from "next/image";
import Link from "next/link";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { nigerianCountries, nigerianStates } from "@/constants";
import { RequiredAsterisk } from "@/components/shared/RequiredAsterisk";
import { Loader } from "@/components/shared/Loader";
import { useRouter } from "next/navigation";
import { addSpaceLocation } from "@/lib/actions/admin/space.actions";

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
	spaceId: string;
	userId: string;
	city: string;
	address: string;
	state: string;
	country: string;
	zipCode: string;
}

export const LocationForm = ({
	spaceId,
	userId,
	address,
	city,
	state,
	country,
	zipCode,
}: Props) => {
	const router = useRouter();
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

			return router.push(`/all-spaces/new/${res?.space?._id}/amenities`);
		} catch (error) {
			toast.error("An error occurred! Try again later.");
		}
	}

	return (
		<div className="mt-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="container max-w-3xl space-y-4">
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
										<Input placeholder="Ikeja" {...field} />
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
											<SelectTrigger>
												<SelectValue placeholder="Nigeria" />
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
					<Footer>
						<div className="container flex items-center justify-between gap-4">
							<Button
								className="underline"
								variant={"ghost"}
								asChild
								size="lg"
							>
								<Link href="/all-spaces/new/structure">
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
