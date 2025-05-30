import { HourlyPriceForm } from "@/app/(new)/components/forms/HourlyPriceForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-3xl">
					Now, set a hourly price
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦5,000. You’ll set a daily price next.
				</p>
			</div>
			<HourlyPriceForm />
		</div>
	);
};

export default page;
