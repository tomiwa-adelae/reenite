import { WeeklyPriceForm } from "@/app/(new)/components/forms/WeeklyPriceForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Now, set a weekly price
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦15,000. You’ll set a monthly price next.
				</p>
			</div>
			<WeeklyPriceForm />
		</div>
	);
};

export default page;
