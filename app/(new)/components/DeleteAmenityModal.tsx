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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	deleteSpaceAmenity,
	deleteSpacePhoto,
} from "@/lib/actions/admin/space.actions";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
	open: boolean;
	closeModal: () => void;
	userId: string;
	spaceId: string;
	amenityId: string;
}

export function DeleteAmenityModal({
	open,
	closeModal,
	userId,
	amenityId,
	spaceId,
}: Props) {
	const [loading, setLoading] = useState(false);

	const deletePhoto = async () => {
		try {
			setLoading(true);
			if (!spaceId || !userId || !amenityId)
				return toast.error("An error occurred!");
			const res = await deleteSpaceAmenity({
				userId,
				spaceId,
				amenityId,
			});
			if (res.status === 400) return toast.error(res.message);
			closeModal();
			toast.success("Amenity successfully deleted!");
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
							Delete this amenity
						</p>
					</div>
					<div className="text-center py-6">
						<p className="font-semibold text-sm">
							This amenity will be removed from your space
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
							onClick={deletePhoto}
							size="md"
						>
							{loading ? <Loader /> : "Delete it"}
						</Button>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}
