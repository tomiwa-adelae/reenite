"use client";
import { Button } from "@/components/ui/button";
import { updateBooking } from "@/lib/actions/customer/booking.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";

export const RetryPaymentButton = ({
	userId,
	bookingId,
	spaceId,
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
	spaceId: string;
}) => {
	const router = useRouter();
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

			if (res.status === 200) {
				toast.success(res.message);
				setLoading(false);
				router.push(
					`/spaces/${spaceId}/book/success?id=${res?.booking?._id}`
				);
			} else {
				toast.error("Payment was not successful. Try again later");
				router.push(
					`/spaces/${spaceId}/book/failed?id=${res?.booking._id}`
				);
			}
		} catch (error) {
			setLoading(false);
			toast.error("An error occurred! Try again later.");
		} finally {
			setLoading(false);
		}
	};

	const onClose = () => {
		toast.error("Payment not successful.! Try again later");
	};

	const initializePayment = usePaystackPayment(config);

	return (
		<div>
			<Button
				onClick={() => {
					initializePayment({
						onSuccess,
						onClose,
					});
				}}
				variant={"ghost"}
				className="underline hover:bg-white w-full md:w-auto"
				size="lg"
				disabled={loading}
			>
				{loading ? "Processing..." : "Retry payment"}
			</Button>
		</div>
	);
};
