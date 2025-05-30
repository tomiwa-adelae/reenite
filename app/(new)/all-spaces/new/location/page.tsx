import { LocationForm } from "@/app/(new)/components/forms/LocationForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<h2 className="font-semibold text-3xl text-center">
					Where's your space located?
				</h2>
			</div>
			<LocationForm />
		</div>
	);
};

export default page;
