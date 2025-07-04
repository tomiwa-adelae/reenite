"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Edit,
	Ellipsis,
	LayoutPanelLeft,
	LogOut,
	Menu,
	Settings,
	Target,
	Trash2,
} from "lucide-react";
import { DEFAULT_PROFILE_PICTURE, userNavLinks } from "@/constants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/database/models/user.model";
import { DeleteImageModal } from "./DeleteImageModal";
import { IPhoto } from "@/lib/database/models/space.model";
import { toast } from "sonner";
import { updateSpaceCoverPhoto } from "@/lib/actions/admin/space.actions";
import { Loader } from "@/components/shared/Loader";

interface Props {
	userId: string;
	photo: IPhoto;
	spaceId: string;
}

export function PhotoDropdown({ photo, userId, spaceId }: Props) {
	const router = useRouter();

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleCoverChange = async () => {
		try {
			setLoading(true);
			if (!spaceId || !userId || !photo.imageId)
				return toast.error("An error occurred!");

			const res = await updateSpaceCoverPhoto({
				userId,
				spaceId,
				imageId: photo.imageId!,
			});
			if (res.status === 400) return toast.error(res.message);

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
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						size="icon"
						variant={"outline"}
						className="bg-[#F5F4F7] size-10 absolute top-2 right-2"
					>
						<Ellipsis />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="py-2">
					{!photo.cover && (
						<div onClick={handleCoverChange}>
							<DropdownMenuItem className="cursor-pointer">
								<Target className="size-5" />
								<span className="text-base font-medium">
									{loading ? <Loader /> : "Make cover photo"}
								</span>
							</DropdownMenuItem>
						</div>
					)}
					<div onClick={() => setOpenDeleteModal(true)}>
						<DropdownMenuItem className="cursor-pointer">
							<Trash2 className="size-5" />
							<span className="text-base font-medium">
								Delete
							</span>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
			{openDeleteModal && (
				<DeleteImageModal
					open={openDeleteModal}
					closeModal={() => setOpenDeleteModal(false)}
					userId={userId}
					spaceId={spaceId}
					imageId={photo.imageId!}
				/>
			)}
		</div>
	);
}
