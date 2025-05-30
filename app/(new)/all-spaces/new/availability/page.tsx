import { AvailabilityForm } from "@/app/(new)/components/forms/AvailabilityForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-3xl">
					When is your space available?
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					You can change this anytime.
				</p>
			</div>
			<AvailabilityForm />
		</div>
	);
};

export default page;
