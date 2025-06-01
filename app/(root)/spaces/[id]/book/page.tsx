import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SpaceContactDetails } from "@/components/spaces/SpaceContactDetails";

const page = () => {
	return (
		<div className="bg-white pt-8 pb-16 relative">
			<div className="container">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className="flex items-center justify-start gap-4">
						<Image
							src={"/assets/images/space-one.jpg"}
							alt={"Space one"}
							width={1000}
							height={1000}
							className="rounded-2xl object-cover size-[100px]"
						/>
						<div>
							<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">
								Mini Conference Room
							</h2>
							<p className="text-sm lg:text-base text-muted-foreground mt-1">
								300 Adeola Odeku St, Victoria Island, Lagos
								101241, Lagos
							</p>
						</div>
					</div>
					<Button size="md">Change space</Button>
				</div>
				<Separator className="my-8" />
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
					<SpaceContactDetails />

					<div className="col-span-4 lg:col-span-2">
						<div className="sticky top-25 rounded-2xl p-4 lg:p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
							<h4 className="text-xl md:text-2xl font-medium">
								Booking details
							</h4>
							<div className="py-2 text-sm lg:text-base mt-4 flex items-center justify-between gap-2">
								<p>Date:</p>
								<p>29th of May, 2025</p>
							</div>
							<Separator className="my-2" />
							<div className="py-2 text-sm lg:text-base flex items-center justify-between gap-2">
								<p>Discount:</p>
								<p>0%</p>
							</div>
							<Separator className="my-2" />
							<div className="py-2 text-lg flex items-center justify-between gap-2 font-semibold">
								<p>Total:</p>
								<p>₦158,000</p>
							</div>
							<Button className="w-full mt-4" size="lg">
								Confirm & Pay
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
