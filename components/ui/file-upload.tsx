import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";
import React, { useRef, useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "./button";
import { toast } from "sonner";

const mainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 20,
		y: -20,
		opacity: 0.9,
	},
};

const secondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export const FileUpload = ({
	onChange,
}: {
	onChange?: (files: File[]) => void;
}) => {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

	const handleFileChange = (newFiles: File[]) => {
		const validFiles = newFiles.filter((file) => {
			const isImage = file.type.startsWith("image/");
			const isValidSize = file.size <= MAX_FILE_SIZE;

			if (!isImage) {
				toast.error(`File "${file.name}" is not an image.`);
			} else if (!isValidSize) {
				toast.error(`File "${file.name}" is larger than 5MB.`);
			}

			return isImage && isValidSize;
		});

		if (validFiles.length) {
			setFiles((prevFiles) => [...prevFiles, ...validFiles]);
			onChange && onChange(validFiles);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, isDragActive } = useDropzone({
		multiple: true,
		accept: {
			"image/*": [],
		},
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (error) => {
			toast.error(error[0]?.errors[0]?.message);
		},
	});

	return (
		<div className="w-full" {...getRootProps()}>
			<motion.div
				onClick={handleClick}
				whileHover="animate"
				className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
			>
				<input
					ref={fileInputRef}
					id="file-upload-handle"
					type="file"
					multiple
					accept="image/*"
					onChange={(e) =>
						handleFileChange(Array.from(e.target.files || []))
					}
					className="hidden"
				/>
				<div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
					<GridPattern />
				</div>
				<div className="flex flex-col items-center justify-center">
					<div className="relative w-full mt-10 max-w-xl mx-auto">
						<motion.div
							layoutId="file-upload"
							variants={mainVariant}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
							className={cn(
								"relative group-hover/file:shadow-2xl z-40 dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
								"shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
							)}
						>
							{isDragActive ? (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-neutral-600 flex flex-col items-center"
								>
									Drop it
									<IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
								</motion.p>
							) : (
								// <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
								<Image
									src={"/assets/icons/images.svg"}
									alt={"Image icon"}
									width={100}
									height={100}
								/>
							)}
						</motion.div>
						<div className="mt-4 flex flex-col items-center justify-center">
							<h4 className="font-medium text-xl lg:text-2xl mb-2">
								Drag and drop
							</h4>
							<p className="text-xs lg:text sm text-center mb-3">
								or browse for photos less than 5MB
							</p>
							<Button size="md">Browse</Button>
						</div>

						{!files.length && (
							<motion.div
								variants={secondaryVariant}
								className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
							></motion.div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export function GridPattern() {
	const columns = 41;
	const rows = 11;
	return (
		<div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
			{Array.from({ length: rows }).map((_, row) =>
				Array.from({ length: columns }).map((_, col) => {
					const index = row * columns + col;
					return (
						<div
							key={`${col}-${row}`}
							className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
								index % 2 === 0
									? "bg-gray-50 dark:bg-neutral-950"
									: "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
							}`}
						/>
					);
				})
			)}
		</div>
	);
}
