import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface UploadModalProps {
	open: boolean;
	onClose: () => void;
	photos: string[];
	setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
	handleUpload: () => void;
	loading: boolean;
}

export const UploadModal = ({
	open,
	onClose,
	photos,
	setPhotos,
	handleUpload,
	loading,
}: UploadModalProps) => {
	return (
		<div>
			<div className="border-b pb-4 text-center md:block">
				<p className="font-semibold text-lg">Upload photos</p>
			</div>
			<div className="pb-16 mb-20 px-6 flex flex-col items-center justify-center">
				<FileUpload
					onChange={(files) => {
						const reader = new FileReader();
						reader.readAsDataURL(files[0]);
						reader.onload = () => {
							try {
								const previewImage = reader.result as string;
								setPhotos((prev) => [previewImage, ...prev]);
							} catch (error) {
								toast.error("An error occurred!");
							}
						};
					}}
				/>
				<div className="grid grid-cols-2 gap-4">
					{photos.map((photo, index) => (
						<div key={index} className="relative">
							<Image
								src={photo}
								alt="Photo"
								width={1000}
								height={1000}
								className="aspect-square object-cover rounded-lg"
							/>
							<Button
								className="text-white hover:text-destructive absolute top-1 right-1"
								size="icon"
								onClick={() => {
									const updatedPhotos = photos.filter(
										(_, i) => i !== index
									);
									setPhotos(updatedPhotos);
								}}
								disabled={loading}
							>
								<Trash2 />
							</Button>
						</div>
					))}
				</div>
			</div>
			<div className="fixed bg-white min-h-16 py-4 bottom-0 w-full border-t">
				<div className="px-6 flex items-center justify-between gap-4 ">
					<Button
						onClick={() => {
							onClose();
							setPhotos([]);
						}}
						size="md"
						variant={"ghost"}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button
						disabled={loading || photos.length === 0}
						onClick={handleUpload}
						size="md"
					>
						{loading ? <Loader /> : "Upload"}
					</Button>
				</div>
			</div>
		</div>
	);
};
