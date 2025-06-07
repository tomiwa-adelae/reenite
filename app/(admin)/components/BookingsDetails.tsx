"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus, Rows2, Search } from "lucide-react";
import { BookingsListings } from "./BookingsListings";
import { NoBookings } from "./NoBookings";
import { BookingsGrid } from "./grids/BookingsGrid";
import Link from "next/link";
import { IBooking } from "@/lib/database/models/booking.model";
import { SearchBar } from "@/components/forms/SearchBar";

export const BookingsDetails = ({
	bookings,
	query,
}: {
	bookings: IBooking[];
	query: string;
}) => {
	const [orientation, setOrientation] = useState<"grid" | "list">("grid");
	const [showSearch, setShowSearch] = useState(false);

	// Load orientation from localStorage on mount
	useEffect(() => {
		const savedOrientation = localStorage.getItem("booking-orientation");
		if (savedOrientation === "grid" || savedOrientation === "list") {
			setOrientation(savedOrientation);
		}
	}, []);

	// Save orientation to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("booking-orientation", orientation);
	}, [orientation]);

	const toggleOrientation = () => {
		setOrientation((prev) => (prev === "grid" ? "list" : "grid"));
	};

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
					Your bookings
				</h2>
				<div className="flex items-center justify-end gap-4">
					{bookings?.length !== 0 && (
						<>
							<Button
								size="icon"
								className="bg-[#F2F2F2]"
								variant={"ghost"}
								onClick={() => setShowSearch(!showSearch)}
							>
								<Search />
							</Button>
							<Button
								className="bg-[#F2F2F2]"
								size="icon"
								variant={"ghost"}
								onClick={toggleOrientation}
							>
								{orientation === "grid" ? (
									<Rows2 />
								) : (
									<LayoutGrid />
								)}
							</Button>
						</>
					)}
					{/* 
					<Button
						className="bg-[#F2F2F2]"
						size="icon"
						variant={"ghost"}
						asChild
					>
						<Link href="/all-bookings/new">
							<Plus />
						</Link>
					</Button> */}
				</div>
			</div>
			{showSearch && (
				<SearchBar
					placeholder="Search booking by id, name, location..."
					onClose={() => setShowSearch(false)}
				/>
			)}
			{bookings?.length === 0 && (
				<NoBookings description={query && "No booking found"} />
			)}

			{bookings?.length !== 0 && (
				<div className="mt-4">
					{orientation === "grid" && (
						<BookingsGrid bookings={bookings} />
					)}
					{orientation === "list" && (
						<BookingsListings bookings={bookings} />
					)}
				</div>
			)}
		</div>
	);
};
