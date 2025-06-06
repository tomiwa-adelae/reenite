"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import {
	noOfHours as numberOfHours,
	noOfUsers as numberOfUsers,
} from "@/constants";

const FormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name is required.",
	}),
	lastName: z.string().min(2, {
		message: "Last name is required.",
	}),
	email: z
		.string()
		.min(2, {
			message: "Email is required.",
		})
		.email(),
	// phoneNumber: z
	// 	.string()
	// 	.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
	// 	.refine(isValidPhoneNumber, {
	// 		message: "Invalid phone number",
	// 	}),
	noOfHours: z.string().optional(),
	noOfUsers: z.string().optional(),
});

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	noOfHours: string;
	noOfUsers: string;
	booking: string;
	onChangeHours: (hours: string) => void;
	onChangeUsers: (hours: string) => void;
}

export const SpaceContactDetails = ({
	firstName,
	lastName,
	email,
	phoneNumber,
	noOfUsers,
	noOfHours,
	booking,
	onChangeHours,
	onChangeUsers,
}: Props) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: firstName || "",
			lastName: lastName || "",
			email: email || "",
			// phoneNumber: "",
			noOfHours: noOfHours || "",
			noOfUsers: noOfUsers || "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast("Submitted...");
	}
	return (
		<div className="col-span-4">
			<h4 className="text-xl md:text-2xl font-medium mb-2">
				Contact details
			</h4>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 mt-4"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input
											disabled
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
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input
											disabled
											placeholder="Doe"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										disabled
										type="email"
										placeholder="johndoe@gmail.com"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					{booking === "hourly" && (
						<FormField
							control={form.control}
							name="noOfHours"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number of hours</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value); // Update react-hook-form state
											onChangeHours(value); // Notify parent component
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select hours" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{numberOfHours.map(
												(hour, index) => (
													<SelectItem
														key={index}
														value={hour}
													>
														{hour}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="noOfUsers"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of users</FormLabel>
								<Select
									onValueChange={(value) => {
										field.onChange(value); // Update react-hook-form state
										onChangeUsers(value); // Notify parent component
									}}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select users" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{numberOfUsers.map(
											({ user, label }, index) => (
												<SelectItem
													key={index}
													value={user}
												>
													{label}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};
