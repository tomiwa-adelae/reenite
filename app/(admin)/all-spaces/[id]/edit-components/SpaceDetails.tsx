"use client";
import { Photos } from "./Photos";
import { SpaceDetailsBox } from "@/app/(admin)/components/SpaceDetailsBox";
import Image from "next/image";
import { ArrowLeft, Wifi } from "lucide-react";
import { PhotosCard } from "@/app/(admin)/components/PhotosCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";

import {
	IAmenity,
	IAvailability,
	IPhoto,
	IPriceTier,
} from "@/lib/database/models/space.model";
import { useEffect, useState } from "react";
import { EditTitleComponent } from "./EditTitleComponent";
import { EditDescriptionComponent } from "./EditDescriptionComponent";
import { EditLocationComponent } from "./EditLocationComponent";
import { ICategory } from "@/lib/database/models/category.model";
import { EditCategoryComponent } from "./EditCategoryComponent";
import { Amenities } from "./Amenities";
import { AmenityBox } from "@/components/shared/AmenityBox";
import { EditAvailabilityComponent } from "./EditAvailabilityComponent";
import { EditDiscountComponent } from "./EditDiscountComponent";
import { EditHourlyPricingComponent } from "./EditHourlyPricingComponent";
import { formatMoneyInput } from "@/lib/utils";
import { EditDailyPricingComponent } from "./EditDailyPricingComponent ";
import { EditMonthlyPricingComponent } from "./EditMonthlyPricingComponent";
import { EditWeeklyPricingComponent } from "./EditWeeklyPricingComponent";
import { ResponsiveModal } from "@/components/modals/ResponsiveModal";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { BackButton } from "@/components/shared/BackButton";

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
	monthlyDiscount: string;
	hourlyDiscount: string;
	weeklyDiscount: string;
	dailyDiscount: string;
	hourlyPricing: IPriceTier;
	dailyPricing: IPriceTier;
	monthlyPricing: IPriceTier;
	weeklyPricing: IPriceTier;
	categories: ICategory[];
	photos: IPhoto[];
	amenities: IAmenity[];
	availability: IAvailability[];
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
	dailyDiscount,
	hourlyDiscount,
	weeklyDiscount,
	monthlyDiscount,
	hourlyPricing,
	weeklyPricing,
	monthlyPricing,
	dailyPricing,
	amenities,
	categories,
	availability,
}: Props) => {
	const [activeSection, setActiveSection] = useState("photos"); // default is photos
	const [openModal, setOpenModal] = useState(false); // default is photos

	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 1024);
		};

		handleResize(); // Run once on mount
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const formattedAvailability = availability
		.filter((item: any) => item.isOpen)
		.map((item: any) => {
			const day = item.day.charAt(0).toUpperCase() + item.day.slice(1);
			const openTime = format(
				parse(item.openingHour, "HH:mm", new Date()),
				"hh:mm a"
			);
			const closeTime = format(
				parse(item.closingHour, "HH:mm", new Date()),
				"hh:mm a"
			);
			return `${day}: ${openTime} to ${closeTime}`;
		});

	return (
		<>
			<div className="h-[calc(100vh-80px)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
				<div className="lg:border-r py-8">
					<div className="lg:container">
						<div className="container flex items-center justify-start gap-4">
							<BackButton slug={"/all-spaces"} />
							<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
								{title}
							</h2>
						</div>
						<div className="h-[calc(100vh-80px)] pb-32 overflow-auto">
							<div className="container">
								<ScrollArea>
									<div className="mt-8 grid gap-4">
										<div
											onClick={() => {
												setActiveSection("photos");
												setOpenModal(true);
											}}
										>
											<SpaceDetailsBox
												active={
													activeSection === "photos"
												}
												name="Photos"
											>
												<PhotosCard photos={photos} />
											</SpaceDetailsBox>
										</div>
										<div
											onClick={() => {
												setActiveSection("title");
												setOpenModal(true);
											}}
										>
											<SpaceDetailsBox
												active={
													activeSection === "title"
												}
												name="Title"
											>
												<h2 className="font-semibold text-muted-foreground text-xl lg:text-2xl mt-2">
													{title}
												</h2>
											</SpaceDetailsBox>
										</div>
										<div
											onClick={() => {
												setActiveSection("description");
												setOpenModal(true);
											}}
										>
											<SpaceDetailsBox
												active={
													activeSection ===
													"description"
												}
												name="Description"
											>
												<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2 line-clamp-4">
													{description}
												</h2>
											</SpaceDetailsBox>
										</div>
										<SpaceDetailsBox
											active={
												activeSection ===
													"hourlyPricing" ||
												activeSection ===
													"weeklyPricing" ||
												activeSection ===
													"monthlyPricing" ||
												activeSection === "dailyPricing"
											}
											name="Pricing"
										>
											<div
												onClick={() => {
													setActiveSection(
														"hourlyPricing"
													);
													setOpenModal(true);
												}}
												className="border-b hover:border-white py-2 transition-all hover:bg-white hover:rounded-lg px-2"
											>
												<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2 line-clamp-4">
													Hourly pricing starts at ₦
													{formatMoneyInput(
														hourlyPricing[1]
													)}
												</h2>
											</div>
											<div
												onClick={() => {
													setActiveSection(
														"dailyPricing"
													);
													setOpenModal(true);
												}}
												className="border-b hover:border-white py-2 transition-all hover:bg-white hover:rounded-lg px-2"
											>
												<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2 line-clamp-4">
													Daily pricing starts at ₦
													{formatMoneyInput(
														dailyPricing[1]
													)}
												</h2>
											</div>
											<div
												onClick={() => {
													setActiveSection(
														"weeklyPricing"
													);
													setOpenModal(true);
												}}
												className="border-b hover:border-white py-2 transition-all hover:bg-white hover:rounded-lg px-2"
											>
												<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2 line-clamp-4">
													Weekly pricing starts at ₦
													{formatMoneyInput(
														weeklyPricing[1]
													)}
												</h2>
											</div>
											<div
												onClick={() => {
													setActiveSection(
														"monthlyPricing"
													);
													setOpenModal(true);
												}}
												className="py-2 transition-all hover:bg-white hover:rounded-lg px-2"
											>
												<h2 className="font-semibold text-muted-foreground text-sm lg:text-base mt-2 line-clamp-4">
													Monthly pricing starts at ₦
													{formatMoneyInput(
														monthlyPricing[1]
													)}
												</h2>
											</div>
										</SpaceDetailsBox>

										<div
											onClick={() => {
												setActiveSection("discount");
												setOpenModal(true);
											}}
										>
											<SpaceDetailsBox
												active={
													activeSection === "discount"
												}
												name="Discount"
											>
												<div className="mt-2 grid gap-2 text-muted-foreground font-semibold text-sm lg:text-base">
													<p>
														{!hourlyDiscount
															? 0
															: hourlyDiscount}
														% hourly discount
													</p>
													<p>
														{!dailyDiscount
															? 0
															: dailyDiscount}
														% daily discount
													</p>
													<p>
														{!weeklyDiscount
															? 0
															: weeklyDiscount}
														% weekly discount
													</p>
													<p>
														{!monthlyDiscount
															? 0
															: monthlyDiscount}
														% monthly discount
													</p>
												</div>
											</SpaceDetailsBox>
										</div>
										<div
											onClick={() => {
												setActiveSection("location");
												setOpenModal(true);
											}}
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
											onClick={() => {
												setActiveSection("amenities");
												setOpenModal(true);
											}}
										>
											<SpaceDetailsBox
												active={
													activeSection ===
													"amenities"
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
											onClick={() => {
												setActiveSection("category");
												setOpenModal(true);
											}}
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
										<div
											onClick={() => {
												setActiveSection(
													"availability"
												);
												setOpenModal(true);
											}}
										>
											<SpaceDetailsBox
												active={
													activeSection ===
													"availability"
												}
												name="Availability"
											>
												<div className="mt-2 grid gap-2 text-muted-foreground font-semibold text-sm lg:text-base">
													{formattedAvailability.map(
														(entry, idx) => (
															<p key={idx}>
																{entry}
															</p>
														)
													)}
												</div>
											</SpaceDetailsBox>
										</div>
									</div>
									{/* <ResponsiveModal /> */}
								</ScrollArea>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden lg:block">
					{activeSection === "photos" && (
						<Photos
							photos={photos}
							userId={userId}
							spaceId={spaceId}
						/>
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
					{activeSection === "availability" && (
						<EditAvailabilityComponent
							userId={userId}
							spaceId={spaceId}
							availability={availability}
						/>
					)}
					{activeSection === "discount" && (
						<EditDiscountComponent
							userId={userId}
							spaceId={spaceId}
							hourlyDiscount={hourlyDiscount}
							dailyDiscount={dailyDiscount}
							weeklyDiscount={weeklyDiscount}
							monthlyDiscount={monthlyDiscount}
						/>
					)}
					{activeSection === "hourlyPricing" && (
						<EditHourlyPricingComponent
							userId={userId}
							spaceId={spaceId}
							initialPricing={hourlyPricing}
						/>
					)}
					{activeSection === "dailyPricing" && (
						<EditDailyPricingComponent
							userId={userId}
							spaceId={spaceId}
							initialPricing={dailyPricing}
						/>
					)}
					{activeSection === "weeklyPricing" && (
						<EditWeeklyPricingComponent
							userId={userId}
							spaceId={spaceId}
							initialPricing={weeklyPricing}
						/>
					)}
					{activeSection === "monthlyPricing" && (
						<EditMonthlyPricingComponent
							userId={userId}
							spaceId={spaceId}
							initialPricing={monthlyPricing}
						/>
					)}
				</div>
			</div>
			{openModal && isSmallScreen && (
				<Drawer
					open={openModal}
					onOpenChange={() => setOpenModal(false)}
				>
					<DrawerContent>
						<ScrollArea className="h-[70vh] mb-24">
							{activeSection === "photos" && (
								<Photos
									photos={photos}
									userId={userId}
									spaceId={spaceId}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "title" && (
								<EditTitleComponent
									userId={userId}
									spaceId={spaceId}
									title={title}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "description" && (
								<EditDescriptionComponent
									userId={userId}
									spaceId={spaceId}
									description={description}
									closeSmallModal={() => setOpenModal(false)}
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
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "category" && (
								<EditCategoryComponent
									userId={userId}
									spaceId={spaceId}
									category={category}
									categories={categories}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "amenities" && (
								<Amenities
									userId={userId}
									spaceId={spaceId}
									amenities={amenities}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "availability" && (
								<EditAvailabilityComponent
									userId={userId}
									spaceId={spaceId}
									availability={availability}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "discount" && (
								<EditDiscountComponent
									userId={userId}
									spaceId={spaceId}
									hourlyDiscount={hourlyDiscount}
									dailyDiscount={dailyDiscount}
									weeklyDiscount={weeklyDiscount}
									monthlyDiscount={monthlyDiscount}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "hourlyPricing" && (
								<EditHourlyPricingComponent
									userId={userId}
									spaceId={spaceId}
									initialPricing={hourlyPricing}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "dailyPricing" && (
								<EditDailyPricingComponent
									userId={userId}
									spaceId={spaceId}
									initialPricing={dailyPricing}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "weeklyPricing" && (
								<EditWeeklyPricingComponent
									userId={userId}
									spaceId={spaceId}
									initialPricing={weeklyPricing}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
							{activeSection === "monthlyPricing" && (
								<EditMonthlyPricingComponent
									userId={userId}
									spaceId={spaceId}
									initialPricing={monthlyPricing}
									closeSmallModal={() => setOpenModal(false)}
								/>
							)}
						</ScrollArea>
					</DrawerContent>
				</Drawer>
			)}
		</>
	);
};
