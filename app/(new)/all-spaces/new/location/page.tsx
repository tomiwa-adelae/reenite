import { LocationForm } from "@/app/(new)/components/forms/LocationForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Where's your space located?
				</h2>
			</div>
			<LocationForm />
		</div>
	);
};

export default page;
