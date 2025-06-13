"use client";
import { Button } from "@/components/ui/button";
import { Ban, Check } from "lucide-react";
import React, { useState } from "react";
import { CancelBookingModal } from "./CancelBookingModal";
import { MarkBookingCompletedModal } from "./MarkBookingCompletedModal";
import { MarkBookingAsPaidModal } from "./MarkBookingAsPaidModal";

export const MarkBookingAsPaid = ({
	userId,
	bookingId,
	paymentStatus,
	bookingStatus,
}: {
	userId: string;
	bookingId: string;
	paymentStatus: string;
	bookingStatus: string;
}) => {
	const [openMarkBookingAsPaidModal, setOpenMarkBookingAsPaidModal] =
		useState(false);
	return (
		<div className='w-full'>
			<Button
				disabled={
					paymentStatus === "paid" ||
					bookingStatus === "cancelled" ||
					bookingStatus === "completed"
				}
				className="w-full"
				size="lg"
				variant='success'
				onClick={() => setOpenMarkBookingAsPaidModal(true)}
			>
				<Check className="size-5" />
				{paymentStatus === "paid" ? "paid" : "Mark as paid"}
			</Button>
			{openMarkBookingAsPaidModal && (
				<MarkBookingAsPaidModal
					open={openMarkBookingAsPaidModal}
					closeModal={() => setOpenMarkBookingAsPaidModal(false)}
					userId={userId}
					bookingId={bookingId!}
				/>
			)}
		</div>
	);
};
