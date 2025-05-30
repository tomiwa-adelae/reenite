import { StructureForm } from "@/app/(new)/components/forms/StructureForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<h2 className="font-semibold text-3xl text-center">
					Which of these best describes your space?
				</h2>
			</div>
			<StructureForm />
		</div>
	);
};

export default page;
