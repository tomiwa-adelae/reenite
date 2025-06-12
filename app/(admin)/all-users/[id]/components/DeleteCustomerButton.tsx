"use client";
import { DeleteCustomerModal } from "@/app/(admin)/components/DeleteCustomerModal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

export const DeleteCustomerButton = ({
	userId,
	customerId,
	isAdmin = false,
}: {
	userId: string;
	customerId: string;
	isAdmin?: boolean;
}) => {
	const [openCustomerModal, setOpenCustomerModal] = useState(false);
	return (
		<div>
			<Button
				onClick={() => setOpenCustomerModal(true)}
				variant={"destructive"}
				size="md"
				className="w-full"
				disabled={isAdmin}
			>
				<X />
				Delete user account
			</Button>
			{openCustomerModal && (
				<DeleteCustomerModal
					open={openCustomerModal}
					closeModal={() => setOpenCustomerModal(false)}
					userId={userId}
					customerId={customerId!}
				/>
			)}
		</div>
	);
};
