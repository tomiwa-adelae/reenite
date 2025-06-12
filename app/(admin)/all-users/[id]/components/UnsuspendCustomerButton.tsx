"use client";
import { UnsuspendCustomerModal } from "@/app/(admin)/components/UnsuspendCustomerModal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

export const UnsuspendCustomerButton = ({
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
				variant={"warning"}
				size="md"
				className="w-full"
				disabled={isAdmin}
			>
				<X />
				Unsuspend user account
			</Button>
			{openCustomerModal && (
				<UnsuspendCustomerModal
					open={openCustomerModal}
					closeModal={() => setOpenCustomerModal(false)}
					userId={userId}
					customerId={customerId!}
				/>
			)}
		</div>
	);
};
