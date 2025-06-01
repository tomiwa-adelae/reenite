import { StructureForm } from "@/app/(new)/components/forms/StructureForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Which of these best describes your space?
				</h2>
			</div>
			<StructureForm />
		</div>
	);
};

export default page;
