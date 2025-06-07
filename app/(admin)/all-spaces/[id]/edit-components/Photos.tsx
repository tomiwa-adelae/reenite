"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { UploadModal } from "@/app/(new)/components/UploadModal";
import { uploadImages } from "@/lib/actions/upload.actions";
import { addSpacePhotos } from "@/lib/actions/admin/space.actions";
import { toast } from "sonner";
import { DeleteImageModal } from "@/app/(new)/components/DeleteImageModal";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";

export const Photos = ({
	photos,
	userId,
	spaceId,
	closeSmallModal,
}: {
	photos: any;
	userId: string;
	spaceId: string;
	closeSmallModal?: () => void;
}) => {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [newPhotos, setNewPhotos] = useState<string[]>([]);

	const handleOpen = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number
	) => {
		e.stopPropagation();
		setCurrentIndex(index);
		setOpen(true);
	};

	const handleDeleteClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		imageId: string
	) => {
		e.stopPropagation(); // prevent triggering Lightbox
		setSelectedImageId(imageId);
		setOpenDeleteModal(true);
	};

	const handleUpload = async () => {
		try {
			setLoading(true);

			if (photos.length === 0)
				return toast.error("There is no photo selected.");

			const uploadedImages = await uploadImages({
				spacePhotos: photos,
				photos: newPhotos,
			});

			const res = await addSpacePhotos({
				userId,
				spaceId,
				uploadedImages,
			});

			if (res.status === 400) return toast.error(res.message);

			setOpenUploadModal(false);
			toast.success("Photos successfully uploaded!");
			setNewPhotos([]);
		} catch (error: any) {
			setLoading(false);
			toast.error(error.message || "An error occurred!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-8 container">
			<Header title={"Space photos"}>
				<Button
					size="icon"
					className="size-10 lg:size-12  bg-[#F7F7F7]"
					variant="ghost"
					onClick={() => setOpenUploadModal(true)}
				>
					<Plus className="size-4 lg:size-6" />
				</Button>
			</Header>

			<div className="lg:h-[calc(100vh-80px)] lg:pb-32 overflow-auto">
				<ScrollArea>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
						{photos.map((photo: any, index: any) => (
							<div
								key={index}
								onClick={(e: any) => handleOpen(e, index)}
								className="group overflow-hidden rounded-2xl relative"
							>
								<Image
									src={photo.src || DEFAULT_SPACE_IMAGE}
									alt={photo.imageId || "Space image"}
									width={1000}
									height={1000}
									className="rounded-2xl object-cover aspect-square hover:scale-[102%] transition-all cursor-pointer"
								/>
								<Button
									className="text-white hover:text-destructive absolute top-1 right-1"
									size="icon"
									onClick={(e) =>
										handleDeleteClick(e, photo.imageId!)
									}
								>
									<Trash2 />
								</Button>
							</div>
						))}
					</div>
				</ScrollArea>
				<footer className="lg:hidden bg-white fixed left-0 lg:left-auto flex items-center justify-center w-full lg:w-1/2 bottom-0  border-t h-20 py-4">
					<div className="container flex items-center justify-end">
						<Button
							onClick={closeSmallModal}
							type="submit"
							size={"lg"}
						>
							Done
						</Button>
					</div>
				</footer>
			</div>
			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					// @ts-ignore
					slides={photos}
					index={currentIndex}
				/>
			)}
			{openDeleteModal && selectedImageId && (
				<DeleteImageModal
					open={openDeleteModal}
					closeModal={() => {
						setOpenDeleteModal(false);
						setSelectedImageId(null);
					}}
					userId={userId}
					spaceId={spaceId}
					imageId={selectedImageId}
				/>
			)}
			{openUploadModal && (
				<ResponsiveModal open={openUploadModal}>
					<UploadModal
						open={openUploadModal}
						onClose={() => {
							setOpenUploadModal(false);
							setNewPhotos([]);
						}}
						photos={newPhotos}
						setPhotos={setNewPhotos}
						handleUpload={handleUpload}
						loading={loading}
					/>
				</ResponsiveModal>
			)}
		</div>
	);
};
