"use client";
import React, { useState } from "react";
import { Footer } from "@/app/(new)/components/Footer";
import Image from "next/image";
import { Ellipsis, Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { FileUpload } from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadImages } from "@/lib/actions/upload.actions";
import { Loader } from "@/components/shared/Loader";
import { addSpacePhotos } from "@/lib/actions/admin/space.actions";
import { IPhoto } from "@/lib/database/models/space.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { PhotoDropdown } from "../PhotoDropdown";
import { UploadModal } from "../UploadModal";

interface Props {
	spaceId: string;
	userId: string;
	spacePhotos: any;
}

export const PhotosForm = ({ spaceId, userId, spacePhotos }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [photos, setPhotos] = useState<string[]>([]);

	const handleUpload = async () => {
		try {
			setLoading(true);

			if (photos.length === 0)
				return toast.error("There is no photo selected.");

			const uploadedImages = await uploadImages({ spacePhotos, photos });

			const res = await addSpacePhotos({
				userId,
				spaceId,
				uploadedImages,
			});

			if (res.status === 400) return toast.error(res.message);

			setOpenUploadModal(false);
			toast.success("Photos successfully uploaded!");
			setPhotos([]);
		} catch (error: any) {
			setLoading(false);
			toast.error(error.message || "An error occurred!");
		} finally {
			setLoading(false);
		}
	};

	const coverImage =
		spacePhotos.find((photo: IPhoto) => photo.cover) || spacePhotos[0];

	return (
		<div className="mt-4">
			<div className="container max-w-3xl">
				{spacePhotos.length !== 0 && (
					<div>
						<div className="relative">
							<Image
								src={coverImage.src || DEFAULT_SPACE_IMAGE}
								alt={"Space image"}
								width={1000}
								height={1000}
								className="aspect-video object-cover rounded-lg"
							/>
							<PhotoDropdown
								photo={coverImage}
								userId={userId}
								spaceId={spaceId}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4 mt-4">
							{spacePhotos
								.filter((photo: IPhoto) => !photo.cover)
								.map((photo: IPhoto, index: string) => (
									<div key={index} className="relative">
										<Image
											src={
												photo.src || DEFAULT_SPACE_IMAGE
											}
											alt={"Space image"}
											width={1000}
											height={1000}
											className="aspect-video object-cover rounded-lg"
										/>
										<PhotoDropdown
											userId={userId}
											photo={photo}
											spaceId={spaceId}
										/>
									</div>
								))}
							{spacePhotos.length < 5 &&
								Array.from({
									length: 5 - spacePhotos.length,
								}).map((_, index) => (
									<div
										key={index}
										onClick={() => setOpenUploadModal(true)}
										className="border-2 border-dashed flex items-center justify-center p-8 aspect-video rounded-lg bg-[#F7F7F7] hover:border-black transition-all cursor-pointer"
									>
										<ImageIcon className="size-6" />
									</div>
								))}
							{spacePhotos.length >= 5 && (
								<div
									onClick={() => setOpenUploadModal(true)}
									className="border-2 border-dashed flex flex-col items-center justify-center p-8 aspect-video rounded-lg bg-[#F7F7F7] hover:border-black transition-all cursor-pointer"
								>
									<ImageIcon className="size-6" />
									<p className="text-sm text-center mt-2 font-semibold">
										Add more
									</p>
								</div>
							)}
						</div>
					</div>
				)}
				{spacePhotos.length === 0 && (
					<div className="col-span-4 border-2 bg-[#F7F7F7] border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px] hover:border-black transition-all cursor-pointer">
						<Image
							src={"/assets/icons/camera.avif"}
							alt={"camera icon"}
							width={1000}
							height={1000}
							className="size-[200px] object-cover"
						/>
						<Button
							onClick={() => setOpenUploadModal(true)}
							size="md"
							variant={"outline"}
						>
							Add photos
						</Button>
					</div>
				)}
			</div>
			<Footer>
				<div className="container flex items-center justify-between gap-4">
					<Button
						className="underline"
						variant={"ghost"}
						asChild
						size="lg"
					>
						<Link href={`/all-spaces/new/${spaceId}/amenities`}>
							Back
						</Link>
					</Button>
					<Button
						onClick={() => {
							if (spacePhotos.length >= 5) {
								router.push(`/all-spaces/new/${spaceId}/title`);
							} else {
								toast.error("Please upload at least 5 photos");
							}
						}}
						disabled={spacePhotos.length < 5}
						size="lg"
					>
						Next
					</Button>
				</div>
			</Footer>
			{openUploadModal && (
				<ResponsiveModal open={openUploadModal}>
					<UploadModal
						open={openUploadModal}
						onClose={() => {
							setOpenUploadModal(false);
							setPhotos([]);
						}}
						photos={photos}
						setPhotos={setPhotos}
						handleUpload={handleUpload}
						loading={loading}
					/>
				</ResponsiveModal>
			)}
		</div>
	);
};
