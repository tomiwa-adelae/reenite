import React from "react";
import { NoBookings } from "@/components/shared/NoBookings";

const page = () => {
	return (
		<div>
			<div className="container">
				<h2 className="font-semibold text-3xl">Past bookings</h2>
				<NoBookings />
			</div>
		</div>
	);
};

export default page;
