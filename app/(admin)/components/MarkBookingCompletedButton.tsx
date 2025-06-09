"use client";
import { Button } from "@/components/ui/button";
import { Ban, Check } from "lucide-react";
import React, { useState } from "react";
import { CancelBookingModal } from "./CancelBookingModal";
import { MarkBookingCompletedModal } from "./MarkBookingCompletedModal";

export const MarkBookingMarkButton = ({
	userId,
	bookingId,
	bookingStatus,
}: {
	userId: string;
	bookingId: string;
	bookingStatus: string;
}) => {
	const [openMarkBookingCompletedModal, setOpenMarkBookingCompletedModal] =
		useState(false);
	return (
		<div>
			<Button
				disabled={
					bookingStatus === "cancelled" ||
					bookingStatus === "completed"
				}
				className="w-full"
				size="lg"
				onClick={() => setOpenMarkBookingCompletedModal(true)}
			>
				<Check className="size-5" />
				{bookingStatus === "cancelled"
					? "Cancelled"
					: "Mark as completed"}
			</Button>
			{openMarkBookingCompletedModal && (
				<MarkBookingCompletedModal
					open={openMarkBookingCompletedModal}
					closeModal={() => setOpenMarkBookingCompletedModal(false)}
					userId={userId}
					bookingId={bookingId!}
				/>
			)}
		</div>
	);
};
