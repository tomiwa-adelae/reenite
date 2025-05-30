import { AmenitiesForm } from "@/app/(new)/components/forms/AmenitiesForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<h2 className="font-semibold text-3xl text-center">
					Tell guests what your space has to offer
				</h2>
			</div>
			<AmenitiesForm />
		</div>
	);
};

export default page;
