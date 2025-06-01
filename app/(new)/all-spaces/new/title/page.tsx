import { TitleForm } from "@/app/(new)/components/forms/TitleForm";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container max-w-3xl">
				<h2 className="font-semibold text-2xl lg:text-3xl">
					Now, let's give your space a title
				</h2>
				<p className="text-base text-muted-foreground mt-2">
					Short titles work best. Have fun with it—you can always
					change it later.
				</p>
			</div>
			<TitleForm />
		</div>
	);
};

export default page;
