"use client";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IPhoto, ISpace } from "@/lib/database/models/space.model";
import { DEFAULT_SPACE_IMAGE } from "@/constants";
import { cn, formatMoneyInput } from "@/lib/utils";
import { useState } from "react";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { SpaceActionModal } from "../SpaceActionModal";

export function SpacesTable({
	spaces,
	userId,
}: {
	spaces: ISpace[];
	userId: string;
}) {
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [selectedSpace, setSelectedSpace] = useState<ISpace | null>(null);

	return (
		<div className="hidden md:block">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead>Space</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Location</TableHead>
						<TableHead className="text-right">Amount</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{spaces.map((space, index) => {
						const coverPhoto =
							// @ts-ignore
							space?.photos.find((photo) => photo.cover) ||
							// @ts-ignore
							space?.photos[0];
						return (
							<TableRow
								onClick={() => {
									if (space?.status === "active") {
										router.push(`/all-spaces/${space._id}`);
									} else {
										// Pop up to choose to continue working on the space or delete the space
										setOpenModal(true);
										setSelectedSpace(space);
									}
								}}
								className="group"
								key={index}
							>
								<TableCell className="flex items-center justify-start gap-4">
									<Image
										src={
											coverPhoto?.src ||
											DEFAULT_SPACE_IMAGE
										}
										alt={
											`${space?.title}'s picture` ||
											"Space picture"
										}
										width={1000}
										height={1000}
										className={cn(
											"size-[70px] rounded-lg",
											coverPhoto && "object-cover"
										)}
									/>
									<h5 className="font-medium text-base">
										{space.title ? (
											space?.title
										) : (
											<p className="italic">No title</p>
										)}
									</h5>
								</TableCell>
								<TableCell>
									{/* @ts-ignore */}
									{space?.category?.name || "Uncategorized"}
								</TableCell>
								<TableCell>
									{!space?.city && (
										<p className="italic">No location</p>
									)}
									{space?.city}
									{space?.city && ","} {space?.state}
								</TableCell>
								<TableCell className="text-right">
									₦
									{formatMoneyInput(
										// @ts-ignore
										space.pricing?.hourly["1"]
									)}
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-end">
										<Button variant={"ghost"} size="icon">
											<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{openModal && selectedSpace && (
				<SpaceActionModal
					open={openModal}
					closeModal={() => setOpenModal(false)}
					userId={userId}
					space={selectedSpace}
				/>
			)}
		</div>
	);
}
