"use client";
import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/lib/actions/admin/customer.actions";
import { useState } from "react";
import { toast } from "sonner";
import {
	cancelBooking,
	markBookingCompleted,
} from "@/lib/actions/admin/booking.actions";

interface Props {
	open: boolean;
	closeModal: () => void;
	userId: string;
	bookingId: string;
}

export function MarkBookingCompletedModal({
	open,
	closeModal,
	userId,
	bookingId,
}: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCompleted = async () => {
		try {
			setLoading(true);
			if (!bookingId || !userId) return toast.error("An error occurred!");

			const res = await markBookingCompleted({ userId, bookingId });
			if (res.status === 400) return toast.error(res.message);

			closeModal();
			toast.success(res.message);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			toast.error(error.message || "An error occurred!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) closeModal();
			}}
		>
			<form>
				<DialogContent className="sm:max-w-[425px] p-0">
					<div className="border-b py-4 text-center md:block">
						<p className="font-semibold text-lg">
							Mark as completed
						</p>
					</div>
					<div className="text-center py-6">
						<p className="font-semibold text-sm">
							Are you sure you want to mark this booking as
							completed?
						</p>
					</div>
					<div className="px-6 py-4 flex items-center justify-between gap-4 border-t">
						<Button
							onClick={() => {
								closeModal();
							}}
							size="md"
							variant={"ghost"}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button
							disabled={loading}
							onClick={handleCompleted}
							size="md"
						>
							{loading ? <Loader /> : "Yes, mark it"}
						</Button>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}
