import React from "react";
import { NoBookings } from "../components/NoBookings";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<h2 className="font-semibold text-3xl lg:text-4xl">
					Your bookings
				</h2>
				{/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <Image
                            src={"/assets/images/space-one.jpg"}
                            alt={"SPace one"}
                            width={1000}
                            height={1000}
                            className="aspect-square object-cover rounded-xl"
                        />
                        <h4 className="text-xl font-medium mt-4">
                            Mini conference room
                        </h4>
                        <p className="text-base text-muted-foreground mt-1">
                            123 Main Street, Abuja
                        </p>
                    </div>
                </div> */}
				<NoBookings />
				{/* <SpacesListings /> */}
			</div>
		</div>
	);
};

export default page;
