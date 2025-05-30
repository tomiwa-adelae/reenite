import { PhotosForm } from "@/app/(new)/components/forms/PhotosForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-3xl">
					Add some photos of your space
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					You'll need 5 photos to get started. You can add more or
					make changes later.
				</p>
			</div>
			<PhotosForm />
		</div>
	);
};

export default page;
