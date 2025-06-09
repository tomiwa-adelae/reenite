"use client";
import { Copy, Hash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export const BookingId = ({ bookingId }: { bookingId: string }) => {
	const copyTextToClipboard = async ({ text }: { text: any }) => {
		try {
			await navigator.clipboard.writeText(text);
			return toast.success(`Copied!`);
		} catch (err) {
			return toast.error("Failed to copy!");
		}
	};
	return (
		<div className="flex items-center justify-start gap-2">
			<Hash className="size-5" />
			<p className="text-sm md:text-base">
				Booking ID: {bookingId}{" "}
				<Copy
					onClick={() =>
						copyTextToClipboard({
							text: bookingId,
						})
					}
					className="size-4 ml-1 inline-block cursor-pointer"
				/>
			</p>
		</div>
	);
};
