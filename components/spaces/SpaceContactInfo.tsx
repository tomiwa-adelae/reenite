import {
	REENITE_CONTACT_PHONE_NUMBER,
	REENITE_EMAIL_ADDRESS,
} from "@/constants";
import React from "react";

export const SpaceContactInfo = () => {
	return (
		<div>
			<h4 className="text-xl md:text-2xl font-medium">
				Contact information
			</h4>
			<div className="grid gap-4 underline mt-4 text-sm md:text-base">
				<a
					className="hover:text-secondary transition-all"
					href={`mailto:${REENITE_EMAIL_ADDRESS}`}
				>
					{REENITE_EMAIL_ADDRESS}
				</a>
				<a
					className="hover:text-secondary transition-all"
					href={`tel:${REENITE_CONTACT_PHONE_NUMBER}`}
				>
					{REENITE_CONTACT_PHONE_NUMBER}
				</a>
			</div>
		</div>
	);
};
