"use client";
import { Photos } from "./Photos";
import { SpaceDetailsBox } from "@/app/(admin)/components/SpaceDetailsBox";
import Image from "next/image";
import { ArrowLeft, Wifi } from "lucide-react";
import { PhotosCard } from "@/app/(admin)/components/PhotosCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IAmenity, IPhoto } from "@/lib/database/models/space.model";
import { useState } from "react";
import { EditTitleComponent } from "./EditTitleComponent";
import { EditDescriptionComponent } from "./EditDescriptionComponent";
import { EditLocationComponent } from "./EditLocationComponent";
import { ICategory } from "@/lib/database/models/category.model";
import { EditCategoryComponent } from "./EditCategoryComponent";
import { Amenities } from "./Amenities";
import { AmenityBox } from "@/components/shared/AmenityBox";

interface Props {
	title: string;
	description: string;
	address: string;
	city: string;
	state: string;
	country: string;
	category: ICategory;
	userId: string;
	spaceId: string;
	zipCode: string;
	categories: ICategory[];
	photos: IPhoto[];
	amenities: IAmenity[];
}

export const SpaceDetails = ({
	title,
	photos,
	description,
	city,
	address,
	state,
	country,
	category,
	spaceId,
	userId,
	zipCode,
	amenities,
	categories,
}: Props) => {
	const [activeSection, setActiveSection] = useState("photos"); // default is photos
	console.log(amenities);
	return (
		<div className="h-[calc(100vh-80px)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
			<div className="lg:border-r py-8">
				<div className="lg:container">
					<div className="container flex items-center justify-start gap-4">
						<Button
							size="icon"
							className="size-10 lg:size-12 bg-[#F7F7F7]"
							variant="ghost"
							asChild
						>
							<Link href="/all-spaces">
								<ArrowLeft className="size-4 lg:size-6" />
							</Link>
						</Button>
						<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
							{title}
						</h2>
					</div>
					<div className="h-[calc(100vh-80px)] pb-32 overflow-auto">
						<div className="container">
							<ScrollArea>
								<div className="mt-8 grid gap-4">
									<div
										onClick={() =>
											setActiveSection("photos")
										}
									>
										<SpaceDetailsBox
											active={activeSection === "photos"}
											name="Photos"
										>
											<PhotosCard photos={photos} />
										</SpaceDetailsBox>
									</div>
									<div
										onClick={() =>
											setActiveSection("title")
										}
									>
										<SpaceDetailsBox
											active={activeSection === "title"}
											name="Title"
										>
											<h2 className="font-semibold text-muted-foreground text-xl lg:text-2xl mt-2">
												{title}
											</h2>
										</SpaceDetailsBox>
									</div>
									<div
										onClick={() =>
											setActiveSection("description")
										}
									>
										<SpaceDetailsBox
											active={
												activeSection === "description"
											}
											name="Description"
										>
											<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2 line-clamp-4">
												{description}
											</h2>
										</SpaceDetailsBox>
									</div>
									<SpaceDetailsBox name="Pricing">
										<div className="mt-2 grid gap-2 text-muted-foreground font-semibold text-sm lg:text-base">
											<p>₦8,900 daily</p>
											<p>₦18,900 monthly</p>
											<p>₦28,900 weekly</p>
											<p>₦38,900 monthly</p>
											<p>40% daily discount</p>
										</div>
									</SpaceDetailsBox>
									<SpaceDetailsBox name="Discount">
										<div className="mt-2 grid gap-2 text-muted-foreground font-semibold text-sm lg:text-base">
											<p>40% daily discount</p>
										</div>
									</SpaceDetailsBox>
									<div
										onClick={() =>
											setActiveSection("location")
										}
									>
										<SpaceDetailsBox
											active={
												activeSection === "location"
											}
											name="Location"
										>
											<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2">
												{address}, {city}, {state},{" "}
												{country}
											</h2>
										</SpaceDetailsBox>
									</div>
									<div
										onClick={() =>
											setActiveSection("amenities")
										}
									>
										<SpaceDetailsBox
											active={
												activeSection === "amenities"
											}
											name="Amenities"
										>
											<div className="mt-2 grid gap-4 text-muted-foreground font-semibold">
												{amenities
													.slice(0, 3)
													.map(
														(
															{ name, icon },
															index
														) => (
															<AmenityBox
																key={index}
																name={name!}
																icon={icon}
															/>
														)
													)}
											</div>
										</SpaceDetailsBox>
									</div>
									<div
										onClick={() =>
											setActiveSection("category")
										}
									>
										<SpaceDetailsBox
											active={
												activeSection === "category"
											}
											name="Category"
										>
											<div className="flex items-center justify-start gap-4 mt-2 text-muted-foreground font-semibold text-sm lg:text-base">
												<Image
													src={category?.image}
													alt={`${category?.name}'s icon`}
													width={1000}
													height={1000}
													className="size-[50px] lg:size-[60px] object-cover"
												/>
												<h5>{category?.name}</h5>
											</div>
										</SpaceDetailsBox>
									</div>
									<SpaceDetailsBox name="Availability">
										<div className="mt-2 grid gap-2 text-muted-foreground font-semibold text-sm lg:text-base">
											<p>Monday 08:00 AM to 06:00PM</p>
											<p>Wednesday 08:00 AM to 06:00PM</p>
											<p>Thursday 08:00 AM to 06:00PM</p>
											<p>Sunday 08:00 AM to 06:00PM</p>
										</div>
									</SpaceDetailsBox>
								</div>
								{/* <ResponsiveModal /> */}
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden lg:block">
				{activeSection === "photos" && (
					<Photos photos={photos} userId={userId} spaceId={spaceId} />
				)}
				{activeSection === "title" && (
					<EditTitleComponent
						userId={userId}
						spaceId={spaceId}
						title={title}
					/>
				)}
				{activeSection === "description" && (
					<EditDescriptionComponent
						userId={userId}
						spaceId={spaceId}
						description={description}
					/>
				)}
				{activeSection === "location" && (
					<EditLocationComponent
						userId={userId}
						spaceId={spaceId}
						address={address}
						city={city}
						state={state}
						country={country}
						zipCode={zipCode}
					/>
				)}
				{activeSection === "category" && (
					<EditCategoryComponent
						userId={userId}
						spaceId={spaceId}
						category={category}
						categories={categories}
					/>
				)}
				{activeSection === "amenities" && (
					<Amenities
						userId={userId}
						spaceId={spaceId}
						amenities={amenities}
					/>
				)}
				{/* <EditDescriptionComponent /> */}
				{/* <EditLocationComponent /> */}
				{/* <Amenities /> */}
				{/* <EditCategoryComponent /> */}
				{/* <EditAvailabilityComponent /> */}
				{/* <EditPricingComponent /> */}
				{/* <EditDiscountComponent /> */}
			</div>
		</div>
	);
};
