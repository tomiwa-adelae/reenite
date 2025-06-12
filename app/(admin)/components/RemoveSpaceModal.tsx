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
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { removeSpace } from "@/lib/actions/admin/space.actions";

interface Props {
	open: boolean;
	closeModal: () => void;
	userId: string;
	space: any;
}

export function RemoveSpaceModal({ open, closeModal, userId, space }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const deleteUser = async () => {
		try {
			setLoading(true);
			if (!space?._id || !userId)
				return toast.error("An error occurred!");

			const res = await removeSpace({ userId, spaceId: space?._id });
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

	const coverPhoto =
		// @ts-ignore
		space?.photos.find((photo) => photo.cover) ||
		// @ts-ignore
		space?.photos[0];

	return (
		<Dialog open={open}>
			<form>
				<DialogContent className="sm:max-w-[425px] p-0">
					<div className="border-b py-4 text-center md:block">
						<p className="font-semibold text-lg">
							Remove this space?
						</p>
					</div>
					<div className="text-center py-6 px-4">
						<p className="font-semibold text-sm mb-4">
							This is permanent—you’ll no longer be able to find
							or edit this space.
						</p>
						<Image
							src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
							alt={`${space?.title}'s picture` || "Space picture"}
							width={1000}
							height={1000}
							className={cn(
								"size-[100px] mx-auto rounded-lg",
								coverPhoto && "object-cover"
							)}
						/>
						<p className="mt-2 text-sm font-medium">
							Your space started {formatDate(space?.createdAt)}
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
							onClick={deleteUser}
							size="md"
							variant="destructive"
						>
							{loading ? <Loader /> : "Yes, remove it"}
						</Button>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}
