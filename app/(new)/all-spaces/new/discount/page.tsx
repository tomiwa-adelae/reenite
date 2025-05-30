import React from "react";
import { DiscountForm } from "@/app/(new)/components/forms/DiscountForm";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-3xl">Add discount</h2>
				<p className="text-base text-muted-foreground mt-2">
					Help your space stand out to get booked faster and earn your
					first reviews.
				</p>
			</div>
			<DiscountForm />
		</div>
	);
};

export default page;
