"use client";
import { Copy } from "lucide-react";
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
		<span className="text-black font-semibold">
			{bookingId}
			<Copy
				onClick={() =>
					copyTextToClipboard({
						text: bookingId,
					})
				}
				className="size-4 ml-2 inline-block cursor-pointer"
			/>
		</span>
	);
};
