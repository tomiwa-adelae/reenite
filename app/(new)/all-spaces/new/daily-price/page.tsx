import { DailyPriceForm } from "@/app/(new)/components/forms/DailyPriceForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Now, set a daily price
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Tip: ₦15,000. You’ll set a weekly price next.
				</p>
			</div>
			<DailyPriceForm />
		</div>
	);
};

export default page;
