import React from "react";
import { MonthlyPriceForm } from "@/app/(new)/components/forms/MonthlyPriceForm";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Now, set a monthly price
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦25,000. You’ll set a discount next.
				</p>
			</div>
			<MonthlyPriceForm />
		</div>
	);
};

export default page;
