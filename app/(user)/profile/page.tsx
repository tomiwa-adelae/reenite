import React from "react";
import Image from "next/image";
import { NoBookings } from "@/components/shared/NoBookings";

const page = () => {
	return (
		<div>
			<div className="container">
				<h2 className="font-semibold text-3xl">
					Welcome back, Tomiwa A.
				</h2>
				<div className="mt-4">
					<div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4">
						<div className="bg-primary rounded-full text-white size-[120px] p-8 flex items-center justify-center">
							<h2 className="text-6xl font-bold">A</h2>
						</div>
						<h2 className="font-semibold text-3xl">
							Adelae Tomiwa
						</h2>
					</div>
					<div className="bg-white rounded-xl p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 hidden lg:grid">
						<h2 className="font-semibold text-2xl">
							Recent bookings
						</h2>
						<NoBookings />
					</div>
					<div className="lg:hidden grid grid-cols-2 gap-4 mt-4">
						<div className="bg-white rounded-xl p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col items-center justify-center gap-4">
							<Image
								src={"/assets/icons/folder.svg"}
								alt={"Folder icon"}
								width={1000}
								height={1000}
								className="size-[100px] object-cover"
							/>
							<h4 className="font-semibold text-lg">
								Past bookings
							</h4>
						</div>
						<div className="bg-white rounded-xl p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col items-center justify-center gap-4">
							<Image
								src={"/assets/icons/explore.svg"}
								alt={"Explore globe icon"}
								width={1000}
								height={1000}
								className="size-[100px] object-cover"
							/>
							<h4 className="font-semibold text-lg">
								Explore spaces
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
