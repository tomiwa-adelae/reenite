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
import { ISpace } from "@/lib/database/models/space.model";
import { cn, formatDate } from "@/lib/utils";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { RemoveSpaceModal } from "./RemoveSpaceModal";

interface Props {
	space: any;
	userId: string;
	open: boolean;
	closeModal: () => void;
}

export function SpaceActionModal({ open, closeModal, space, userId }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [openRemoveSpaceModal, setOpenRemoveSpaceModal] = useState(false);

	const handleEdit = () => {
		try {
			if (!space?.address)
				return router.push(`/all-spaces/new/${space?._id}/location`);
			if (space?.amenities.length === 0)
				return router.push(`/all-spaces/new/${space?._id}/amenities`);
			if (space?.photos.length !== 5)
				return router.push(`/all-spaces/new/${space?._id}/photos`);
			if (!space?.title)
				return router.push(`/all-spaces/new/${space?._id}/title`);
			if (!space?.description)
				return router.push(`/all-spaces/new/${space?._id}/description`);
			if (!space?.availability)
				return router.push(
					`/all-spaces/new/${space?._id}/availability`
				);
			if (!space?.pricing.hourly)
				return router.push(
					`/all-spaces/new/${space?._id}/hourly-price`
				);
			if (!space?.pricing.daily)
				return router.push(`/all-spaces/new/${space?._id}/daily-price`);
			if (!space?.pricing.weekly)
				return router.push(
					`/all-spaces/new/${space?._id}/weekly-price`
				);
			if (!space?.pricing.monthly)
				return router.push(
					`/all-spaces/new/${space?._id}/monthly-price`
				);
			if (!space?.hourlyDiscount)
				return router.push(`/all-spaces/new/${space?._id}/discount`);

			router.push(`/all-spaces/${space?._id}`);
		} catch (error) {
			toast.error("An error occurred!");
		}
	};

	const coverPhoto =
		// @ts-ignore
		space?.photos.find((photo) => photo.cover) ||
		// @ts-ignore
		space?.photos[0];

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={(isOpen) => {
					if (!isOpen) closeModal();
				}}
			>
				<form>
					<DialogContent className="sm:max-w-[425px] p-0">
						<div className="text-center pt-6">
							<Image
								src={coverPhoto?.src || DEFAULT_SPACE_IMAGE}
								alt={
									`${space?.title}'s picture` ||
									"Space picture"
								}
								width={1000}
								height={1000}
								className={cn(
									"size-[100px] mx-auto rounded-lg",
									coverPhoto && "object-cover"
								)}
							/>
							<p className="mt-2 text-sm font-medium">
								Your space started{" "}
								{formatDate(space?.createdAt)}
							</p>
						</div>
						<div className="px-6 py-4 flex items-center justify-between gap-4 border-t">
							<Button
								disabled={loading}
								onClick={() => setOpenRemoveSpaceModal(true)}
								size="md"
								variant="destructive"
							>
								Remove space
							</Button>
							<Button
								size="md"
								onClick={handleEdit}
								disabled={loading}
							>
								Edit space
							</Button>
						</div>
					</DialogContent>
				</form>
			</Dialog>
			{openRemoveSpaceModal && (
				<RemoveSpaceModal
					open={openRemoveSpaceModal}
					closeModal={() => {
						setOpenRemoveSpaceModal(false);
						closeModal();
					}}
					userId={userId}
					space={space!}
				/>
			)}
		</>
	);
}
