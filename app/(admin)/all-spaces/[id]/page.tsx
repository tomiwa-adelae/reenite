import React from "react";
import { PhotosCard } from "../../components/PhotosCard";
import { ArrowLeft, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpaceDetailsBox } from "../../components/SpaceDetailsBox";
import Image from "next/image";
import { Photos } from "./edit-components/Photos";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditTitleComponent } from "./edit-components/EditTitleComponent";
import { EditDescriptionComponent } from "./edit-components/EditDescriptionComponent";
import { EditLocationComponent } from "./edit-components/EditLocationComponent";
import { Amenities } from "./edit-components/Amenities";
import { EditCategoryComponent } from "./edit-components/EditCategoryComponent";
import { EditAvailabilityComponent } from "./edit-components/EditAvailabilityComponent";
import { EditPricingComponent } from "./edit-components/EditPricingComponent";
import { EditDiscountComponent } from "./edit-components/EditDiscountComponent";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";

const page = () => {
	return (
		<div className="h-[calc(100vh-80px)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
			<div className="lg:border-r py-8">
				<div className="container">
					<div className="container flex items-center justify-start gap-4">
						<Button
							size="icon"
							className="size-12 bg-[#F7F7F7]"
							variant="ghost"
						>
							<ArrowLeft className="size-6" />
						</Button>
						<h2 className="font-semibold text-3xl lg:text-4xl">
							Mini Conference Room
						</h2>
					</div>
					<div className="h-[calc(100vh-80px)] pb-32 overflow-auto">
						<div className="container">
							<ScrollArea>
								<div className="mt-8 grid gap-4">
									<SpaceDetailsBox name="Photos">
										<PhotosCard />
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Title">
										<h2 className="font-semibold text-muted-foreground text-2xl mt-2">
											Mini Conference Room
										</h2>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Description">
										<h2 className="font-semibold text-muted-foreground text-base mt-2">
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit. Nam
											libero ducimus tempore iure iusto
											rerum reprehenderit, quas
											praesentium eveniet quidem!
										</h2>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Pricing">
										<div className="mt-2 grid gap-2 text-muted-foreground font-semibold">
											<p>₦8,900 daily</p>
											<p>₦18,900 monthly</p>
											<p>₦28,900 weekly</p>
											<p>₦38,900 monthly</p>
											<p>40% daily discount</p>
										</div>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Discount">
										<div className="mt-2 grid gap-2 text-muted-foreground font-semibold">
											<p>40% daily discount</p>
										</div>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Location">
										<h2 className="font-semibold text-muted-foreground text-base mt-2">
											123 Main Street, Magodo GRA, Ikeja,
											Lagos state
										</h2>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Amenities">
										<div className="mt-2 grid gap-4 text-muted-foreground font-semibold">
											<div className="flex items-center justify-start gap-3">
												<Wifi className="size-6" />{" "}
												<p className="text-base">
													Wifi
												</p>
											</div>
											<div className="flex items-center justify-start gap-3">
												<Wifi className="size-6" />{" "}
												<p className="text-base">
													Wifi
												</p>
											</div>
											<div className="flex items-center justify-start gap-3">
												<Wifi className="size-6" />{" "}
												<p className="text-base">
													Wifi
												</p>
											</div>
										</div>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Category">
										<div className="flex items-center justify-start gap-4 mt-2 text-muted-foreground font-semibold">
											<Image
												src={"/assets/icons/office.svg"}
												alt={`icon`}
												width={1000}
												height={1000}
												className="size-[60px] object-cover"
											/>
											<h5>Space desk</h5>
										</div>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Availability">
										<div className="mt-2 grid gap-2 text-muted-foreground font-semibold">
											<p>Monday 08:00 AM to 06:00PM</p>
											<p>Wednesday 08:00 AM to 06:00PM</p>
											<p>Thursday 08:00 AM to 06:00PM</p>
											<p>Sunday 08:00 AM to 06:00PM</p>
										</div>
									</SpaceDetailsBox>
								</div>
								<ResponsiveModal />
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="hidden lg:block"> */}
			{/* <Photos /> */}
			{/* <EditTitleComponent /> */}
			{/* <EditDescriptionComponent /> */}
			{/* <EditLocationComponent /> */}
			{/* <Amenities /> */}
			{/* <EditCategoryComponent /> */}
			{/* <EditAvailabilityComponent /> */}
			{/* <EditPricingComponent /> */}
			{/* <EditDiscountComponent /> */}
			{/* </div> */}
		</div>
	);
};

export default page;
