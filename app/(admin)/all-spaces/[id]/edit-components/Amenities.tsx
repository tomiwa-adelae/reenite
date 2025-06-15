"use client";
import { DeleteAmenityModal } from "@/app/(new)/components/DeleteAmenityModal";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { availableAmenities } from "@/constants";
import { addSpaceAmenities } from "@/lib/actions/admin/space.actions";
import { IAmenity } from "@/lib/database/models/space.model";
import { iconMap } from "@/lib/lucide-icons";
import { cn } from "@/lib/utils";
import { Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { Header } from "./Header";
import { NoAmenities } from "@/app/(admin)/components/NoAmenities";

interface Props {
	userId: string;
	spaceId: string;
	amenities: IAmenity[];
	closeSmallModal?: () => void;
}

export interface AmenitiesOption {
	name: string;
	iconName: any;
	icon: any;
}

export const Amenities = ({
	userId,
	spaceId,
	amenities,
	closeSmallModal,
}: Props) => {
	const [openAmenitiesModal, setOpenAmenitiesModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newAmenities, setNewAmenities] = useState<any>([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedAmenityId, setSelectedAmenityId] = useState<string | null>(
		null
	);

	const addAmenity = (amenity: AmenitiesOption) => {
		const newAmenity = {
			icon: amenity.iconName,
			name: amenity.name,
			iconName: amenity.iconName,
		};

		if (!newAmenities.some((c: any) => c.name === amenity.name)) {
			setNewAmenities([...newAmenities, newAmenity]);
		}
	};

	const removeAmenity = (amenity: AmenitiesOption) => {
		setNewAmenities(
			newAmenities.filter((a: any) => a.name !== amenity.name)
		);
	};

	const handleDeleteClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		imageId: string
	) => {
		e.stopPropagation(); // prevent triggering Lightbox
		setSelectedAmenityId(imageId);
		setOpenDeleteModal(true);
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			if (newAmenities.length === 0)
				return toast.error("Please select at least one amenity!");

			const res = await addSpaceAmenities({
				userId,
				spaceId,
				amenities: newAmenities,
			});

			if (res.status === 400) return toast.error(res.message);

			toast.success("Amenities successfully added!");
			setOpenAmenitiesModal(false);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-8">
			<Header title={"Amenities"}>
				<Button
					size="icon"
					className="size-10 lg:size-12 bg-[#F7F7F7]"
					variant="ghost"
					onClick={() => setOpenAmenitiesModal(true)}
				>
					<Plus className="size-4 lg:size-6" />
				</Button>
			</Header>
			<div className="container">
				<p className="text-sm lg:text-base mt-2 text-muted-foreground">
					You’ve added these to your listing so far.
				</p>
				<div className="lg:h-[calc(100vh-80px)] lg:pb-32 pb-12 overflow-auto">
					<ScrollArea>
						<div className="mt-8 grid grid-cols-1 gap-1">
							{amenities?.map((amenity: any, index) => {
								const Icon = iconMap[amenity.icon!];
								return (
									<div
										key={index}
										className="rounded-lg p-4 flex items-center justify-between gap-2 cursor-pointer hover:border-black hover:bg-[#F7F7F7] transition-all"
									>
										<div className="flex items-start justify-center gap-2">
											<Icon className="size-4 lg:size-6" />
											<h5 className="font-medium text-sm lg:text-base">
												{amenity.name}
											</h5>
										</div>
										<Button
											size="icon"
											// className="size-12"
											variant={"destructive"}
											onClick={(e) =>
												handleDeleteClick(
													e,
													amenity._id!
												)
											}
										>
											<Trash2 />
										</Button>
									</div>
								);
							})}
						</div>
						{amenities?.length === 0 && <NoAmenities />}
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
			</div>
			{openDeleteModal && selectedAmenityId && (
				<DeleteAmenityModal
					open={openDeleteModal}
					closeModal={() => {
						setOpenDeleteModal(false);
						setSelectedAmenityId(null);
					}}
					userId={userId}
					spaceId={spaceId}
					amenityId={selectedAmenityId}
				/>
			)}
			{openAmenitiesModal && (
				<ResponsiveModal open={openAmenitiesModal}>
					<div className="border-b pb-4 text-center md:block">
						<p className="font-semibold text-lg">Add amenities</p>
					</div>
					<div>
						{availableAmenities.filter(
							(a) =>
								!amenities.some(
									(existing) => existing.name === a.name
								)
						).length === 0 && (
							<div className="mt-8 px-6 flex flex-col items-center justify-center">
								<Image
									src={"/assets/icons/folder.svg"}
									alt="Folder icon"
									width={1000}
									height={1000}
									className="size-[170px] object-cover"
								/>
								<p className="text-muted-foreground text-center text-sm lg:text-base mt-4">
									No more amenities to select from.
								</p>
							</div>
						)}
						<div className="mt-8 mb-32 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6 gap-4">
							{availableAmenities
								.filter(
									(a) =>
										!amenities.some(
											(existing) =>
												existing.name === a.name
										)
								)
								.map((amenity, index) => {
									const Icon = amenity.icon;

									const isSelected = newAmenities.some(
										(a: any) => a.name === amenity.name
									);

									return (
										<div
											key={index}
											className={cn(
												"border-2 rounded-lg p-6 flex flex-row md:flex-col items-center md:items-start justify-center gap-2 cursor-pointer hover:bg-[#F7F7F7] hover:border-black hover:border-2 transition-all",
												isSelected &&
													"border-black bg-[#F7F7F7] hover:bg-white"
											)}
											onClick={() =>
												isSelected
													? removeAmenity(amenity)
													: addAmenity(amenity)
											}
										>
											<Icon className="size-6 lg:size-7" />
											<h5 className="font-medium text-base lg:text-lg">
												{amenity.name}
											</h5>
										</div>
									);
								})}
						</div>
					</div>
					<div className="fixed bg-white min-h-16 py-4 bottom-0 w-full border-t">
						<div
							className={cn(
								"px-6 flex items-center justify-between gap-4",
								availableAmenities.filter(
									(a) =>
										!amenities.some(
											(existing) =>
												existing.name === a.name
										)
								).length === 0 && "justify-end"
							)}
						>
							{availableAmenities.filter(
								(a) =>
									!amenities.some(
										(existing) => existing.name === a.name
									)
							).length !== 0 && (
								<Button
									onClick={() => {
										setOpenAmenitiesModal(false);
										setNewAmenities([]);
									}}
									size="md"
									variant={"ghost"}
									disabled={loading}
								>
									Cancel
								</Button>
							)}
							{availableAmenities.filter(
								(a) =>
									!amenities.some(
										(existing) => existing.name === a.name
									)
							).length === 0 ? (
								<Button
									onClick={() => {
										setOpenAmenitiesModal(false);
										setNewAmenities([]);
									}}
									size="md"
									disabled={loading}
								>
									Close
								</Button>
							) : (
								<Button
									disabled={
										loading || newAmenities.length === 0
									}
									onClick={handleSubmit}
									size="md"
								>
									{loading ? <Loader /> : "Done"}
								</Button>
							)}
						</div>
					</div>
				</ResponsiveModal>
			)}
		</div>
	);
};
