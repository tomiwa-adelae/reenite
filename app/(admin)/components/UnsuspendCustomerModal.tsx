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
import {
	suspendCustomer,
	unsuspendCustomer,
} from "@/lib/actions/admin/customer.actions";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
	open: boolean;
	closeModal: () => void;
	userId: string;
	customerId: string;
}

export function UnsuspendCustomerModal({
	open,
	closeModal,
	userId,
	customerId,
}: Props) {
	const [loading, setLoading] = useState(false);

	const suspendUser = async () => {
		try {
			setLoading(true);
			if (!customerId || !userId)
				return toast.error("An error occurred!");

			const res = await unsuspendCustomer({ userId, customerId });
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
		<Dialog open={open}>
			<form>
				<DialogContent className="sm:max-w-[425px] p-0">
					<div className="border-b py-4 text-center md:block">
						<p className="font-semibold text-lg">
							Unsuspend this user
						</p>
					</div>
					<div className="text-center py-6">
						<p className="font-semibold text-sm">
							Are you sure you want to unsuspend this user?
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
							onClick={suspendUser}
							size="md"
						>
							{loading ? <Loader /> : "Yes, unsuspend user"}
						</Button>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}
