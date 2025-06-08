"use client";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { updateProfilePicture } from "@/lib/actions/customer/user.actions";
import { uploadProfilePicture } from "@/lib/actions/upload.actions";
import { Camera, Loader } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export const EditProfilePicture = ({ userId }: { userId: string }) => {
	const [openUploadModal, setOpenUploadModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [picture, setPicture] = useState("");

	const handleUpload = async () => {
		try {
			setLoading(true);
			if (picture.length === 0)
				return toast.error("There is no photo selected.");

			const uploadedProfilePicture = await uploadProfilePicture(picture);

			if (
				!uploadedProfilePicture.picture ||
				!uploadedProfilePicture.pictureId
			)
				return toast.error("Oops! An error occurred. Try again later");

			const details = {
				picture: uploadedProfilePicture.picture,
				pictureId: uploadedProfilePicture.pictureId,
				userId,
			};

			const res = await updateProfilePicture({ ...details });

			if (res.status === 400) return toast.error(res.message);

			setOpenUploadModal(false);
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
		<>
			<Button
				size="sm"
				variant={"white"}
				className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 absolute bottom-[-15px] left-1/2 -translate-x-1/2"
				onClick={() => setOpenUploadModal(true)}
			>
				<Camera /> Edit
			</Button>
			<div>
				{openUploadModal && (
					<ResponsiveModal open={openUploadModal}>
						<div>
							<div className="border-b pb-4 text-center md:block">
								<p className="font-semibold text-lg">
									Upload photos
								</p>
							</div>
							<div className="pb-16 mb-20 px-6 flex flex-col items-center justify-center">
								{!picture && (
									<FileUpload
										onChange={(files) => {
											const reader = new FileReader();
											reader.readAsDataURL(files[0]);
											reader.onload = () => {
												try {
													const previewImage =
														reader.result as string;
													setPicture(previewImage);
												} catch (error) {
													toast.error(
														"An error occurred!"
													);
												}
											};
										}}
									/>
								)}
								{picture && (
									<div className="pt-16 relative">
										<Image
											src={picture}
											alt="Profile picture"
											width={1000}
											height={1000}
											className="size-[250px] object-cover rounded-full"
										/>
										<Button
											size="sm"
											variant={"white"}
											className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 absolute bottom-[-15px] left-1/2 -translate-x-1/2"
											onClick={() => setPicture("")}
										>
											<Camera /> Change photo
										</Button>
									</div>
								)}
							</div>
							<div className="fixed bg-white min-h-16 py-4 bottom-0 w-full border-t">
								<div className="px-6 flex items-center justify-between gap-4 ">
									<Button
										onClick={() => {
											setOpenUploadModal(false);
											setPicture("");
										}}
										size="md"
										variant={"ghost"}
										disabled={loading}
									>
										Cancel
									</Button>
									<Button
										disabled={loading || !picture}
										onClick={handleUpload}
										size="md"
									>
										{loading ? <Loader /> : "Upload"}
									</Button>
								</div>
							</div>
						</div>
					</ResponsiveModal>
				)}
			</div>
		</>
	);
};
