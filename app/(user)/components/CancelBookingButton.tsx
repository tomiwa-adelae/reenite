"use client";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import React, { useState } from "react";
import { CancelBookingModal } from "./CancelBookingModal";

export const CancelBookingButton = ({
	userId,
	bookingId,
	bookingStatus,
}: {
	userId: string;
	bookingId: string;
	bookingStatus: string;
}) => {
	const [openCancelBookingModal, setOpenCancelBookingModal] = useState(false);
	return (
		<div>
			<Button
				disabled={
					bookingStatus === "cancelled" ||
					bookingStatus === "completed"
				}
				size="md"
				variant={"destructive"}
				onClick={() => setOpenCancelBookingModal(true)}
			>
				<Ban className="size-5" />
				{bookingStatus === "cancelled" ? "Cancelled" : "Cancel booking"}
			</Button>
			{openCancelBookingModal && (
				<CancelBookingModal
					open={openCancelBookingModal}
					closeModal={() => setOpenCancelBookingModal(false)}
					userId={userId}
					bookingId={bookingId!}
				/>
			)}
		</div>
	);
};
