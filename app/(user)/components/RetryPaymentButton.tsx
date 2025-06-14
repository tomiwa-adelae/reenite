"use client";
import { Button } from "@/components/ui/button";
import { updateBooking } from "@/lib/actions/customer/booking.actions";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";

export const RetryPaymentButton = ({
	userId,
	bookingId,
	email,
	totalPrice,
	firstName,
	lastName,
}: {
	userId: string;
	email: string;
	totalPrice: string;
	lastName: string;
	firstName: string;
	bookingId: string;
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	// Move this hook out of the handleSubmit function
	const config = {
		reference: new Date().getTime().toString(),
		email,
		amount: Number(totalPrice) * 100, // Convert to kobo
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		metadata: {
			name: `${firstName} ${lastName}`,
			custom_fields: [
				{
					display_name: "Full Name",
					variable_name: "full_name",
					value: `${firstName} ${lastName}`,
				},
			],
		},
	};

	const onSuccess = async (reference: any) => {
		try {
			setLoading(true);
			const details = {
				bookingId,
				userId,
				trxref: reference.trxref,
				transactionId: reference.transaction,
				paymentStatus:
					reference.status === "success" ? "paid" : "failed",
				bookingStatus: "confirmed",
			};

			const res = await updateBooking({ ...details });

			if (res.status === 400) return toast.error(res.message);

			toast.success(`Your payment was successful.`);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	const onClose = async () => {
		try {
			setLoading(true);
			const details = {
				bookingId,
				userId,
				trxref: "",
				transactionId: "",
				paymentStatus: "failed",
				bookingStatus: "pending",
			};

			const res = await updateBooking({ ...details });

			if (res?.status === 400) return toast.error("An error occurred!");

			toast.error(
				"Oops! Your payment was still not successful. Try again later"
			);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	const initializePayment = usePaystackPayment(config);

	return (
		<div className="w-full lg:w-auto">
			<Button
				onClick={() => {
					initializePayment({
						onSuccess,
						onClose,
					});
				}}
				size="md"
				disabled={loading}
				className="w-full lg:w-auto"
			>
				<RotateCcw className="size-5" />
				{loading ? "Processing..." : "Retry payment"}
			</Button>
		</div>
	);
};
