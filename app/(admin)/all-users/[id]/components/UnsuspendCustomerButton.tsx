"use client";
import { UnsuspendCustomerModal } from "@/app/(admin)/components/UnsuspendCustomerModal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

export const UnsuspendCustomerButton = ({
	userId,
	customerId,
}: {
	userId: string;
	customerId: string;
}) => {
	const [openCustomerModal, setOpenCustomerModal] = useState(false);
	return (
		<div>
			<Button
				onClick={() => setOpenCustomerModal(true)}
				variant={"warning"}
				size="md"
				className="w-full"
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
