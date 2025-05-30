import React from "react";
import { NoAdminData } from "../components/NoAdminData";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				{/* <h2 className="font-semibold text-3xl">
					Welcome back, Tomiwa A.
				</h2> */}
				<NoAdminData />
			</div>
		</div>
	);
};

export default page;
