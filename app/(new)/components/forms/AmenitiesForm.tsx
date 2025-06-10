"use client";
import React, { useEffect, useState } from "react";
import { Footer } from "@/app/(new)/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { availableAmenities } from "@/constants";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/shared/Loader";
import { addSpaceAmenities } from "@/lib/actions/admin/space.actions";

interface Props {
	spaceId: string;
	userId: string;
}

export interface AmenitiesOption {
	name: string;
	icon: any;
	iconName: any;
}

export const AmenitiesForm = ({ spaceId, userId }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [selectedAmenities, setSelectedAmenities] = useState<
		AmenitiesOption[]
	>([]);

	const addAmenity = (amenity: AmenitiesOption) => {
		const newAmenity = {
			icon: amenity.iconName,
			name: amenity.name,
			iconName: amenity.iconName,
		};

		if (!selectedAmenities.some((c) => c.name === amenity.name)) {
			setSelectedAmenities([...selectedAmenities, newAmenity]);
		}
	};

	const removeAmenity = (amenity: AmenitiesOption) => {
		setSelectedAmenities(
			selectedAmenities.filter((a) => a.name !== amenity.name)
		);
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			if (selectedAmenities.length === 0)
				return toast.error("Please select at least one amenity!");

			const res = await addSpaceAmenities({
				userId,
				spaceId,
				amenities: selectedAmenities,
			});

			if (res.status === 400) return toast.error(res.message);
			toast.success("Amenities successfully added!");
			return router.push(`/all-spaces/new/${res?.space?._id}/photos`);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="container max-w-3xl">
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{availableAmenities.map((amenity, index) => {
						const Icon = amenity.icon;

						const isSelected = selectedAmenities.some(
							(a) => a.name === amenity.name
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
			<Footer>
				<div className="container flex items-center justify-between gap-4">
					<Button
						className="underline"
						variant={"ghost"}
						asChild
						size="lg"
					>
						<Link href={`/all-spaces/new/${spaceId}/location`}>
							Back
						</Link>
					</Button>
					<Button
						disabled={selectedAmenities.length === 0 || loading}
						onClick={handleSubmit}
						size="lg"
					>
						{loading ? <Loader /> : "Next"}
					</Button>
				</div>
			</Footer>
		</div>
	);
};
