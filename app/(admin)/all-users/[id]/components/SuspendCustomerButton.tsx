"use client";
import { SuspendCustomerModal } from "@/app/(admin)/components/SuspendCustomerModal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

export const SuspendCustomerButton = ({
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
				Suspend user account
			</Button>
			{openCustomerModal && (
				<SuspendCustomerModal
					open={openCustomerModal}
					closeModal={() => setOpenCustomerModal(false)}
					userId={userId}
					customerId={customerId!}
				/>
			)}
		</div>
	);
};
