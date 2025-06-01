import { DescriptionForm } from "@/app/(new)/components/forms/DescriptionForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Create your description
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Share what makes your space special.
				</p>
			</div>
			<DescriptionForm />
		</div>
	);
};

export default page;
