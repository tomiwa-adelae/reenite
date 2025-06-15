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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
	addSpaceTitle,
	updateVisibility,
} from "@/lib/actions/admin/space.actions";
import { Loader } from "@/components/shared/Loader";
import { Header } from "./Header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
	status: z.string({
		required_error: "You need to select a notification type.",
	}),
});

interface Props {
	userId: string;
	spaceId: string;
	status: string;
	closeSmallModal?: () => void;
}

export const EditVisibilityComponent = ({
	status,
	userId,
	spaceId,
	closeSmallModal,
}: Props) => {
	const [loading, setLoading] = useState(false);

	const [openModal, setOpenModal] = useState(false);
	const [statusType, setStatusType] = useState("");

	const handleChange = async () => {
		try {
			setLoading(true);
			if (!spaceId || !userId || !statusType)
				return toast.error("An error occurred!");

			const res = await updateVisibility({
				userId,
				spaceId,
				status: statusType,
			});
			if (res.status === 400) return toast.error(res.message);

			setOpenModal(false);
			toast.success("Visibility successfully updated!");
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			toast.error(error.message || "An error occurred!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative pt-8">
			<Header title={"Space visibility"} />
			<div className="container">
				<p className="text-sm lg:text-base mt-2 text-muted-foreground">
					Choose what to do with your space
				</p>
			</div>
			<div className="lg:h-[calc(100vh-80px)] lg:pb-40 pb-12 overflow-auto">
				<ScrollArea>
					<div className="py-8 container grid gap-4">
						{status !== "draft" && (
							<Button
								onClick={() => {
									setOpenModal(true);
									setStatusType("draft");
								}}
								className="w-full"
								size="lg"
								variant="outline"
							>
								Draft space
							</Button>
						)}
						{status !== "active" && (
							<Button
								onClick={() => {
									setOpenModal(true);
									setStatusType("active");
								}}
								className="w-full"
								size="lg"
							>
								Make space active
							</Button>
						)}
						{status !== "hidden" && (
							<Button
								className="w-full"
								size="lg"
								variant="destructive"
								onClick={() => {
									setOpenModal(true);
									setStatusType("hidden");
								}}
							>
								Make space hidden
							</Button>
						)}
					</div>
				</ScrollArea>
			</div>
			<Dialog open={openModal}>
				<form>
					<DialogContent className="sm:max-w-[425px] p-0">
						<div className="border-b py-4 text-center md:block">
							<p
								className={cn(
									"font-semibold text-lg",
									statusType === "hidden" &&
										"text-destructive"
								)}
							>
								{statusType === "draft" &&
									"Move space to draft"}
								{statusType === "active" && "Make space active"}
								{statusType === "hidden" && "Make space hidden"}
							</p>
						</div>
						<div className="text-center py-6">
							<p className="font-semibold text-sm">
								Are you sure you want to make this change?
							</p>
						</div>
						<div className="px-6 py-4 flex items-center justify-between gap-4 border-t">
							<Button
								onClick={() => setOpenModal(false)}
								size="md"
								variant={"ghost"}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button
								disabled={loading}
								onClick={handleChange}
								size="md"
								variant={
									statusType === "draft"
										? "warning"
										: statusType === "active"
										? "default"
										: "destructive"
								}
							>
								{loading ? <Loader /> : "Yes"}
							</Button>
						</div>
					</DialogContent>
				</form>
			</Dialog>
		</div>
	);
};
