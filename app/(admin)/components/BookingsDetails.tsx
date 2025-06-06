"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search } from "lucide-react";
import { BookingsListings } from "./BookingsListings";
import { NoBookings } from "./NoBookings";
import { BookingsGrid } from "./grids/BookingsGrid";
import Link from "next/link";
import { IBooking } from "@/lib/database/models/booking.model";

export const BookingsDetails = ({ bookings }: { bookings: IBooking[] }) => {
	const [orientation, setOrientation] = useState("grid");

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-3xl lg:text-4xl">
					Your bookings
				</h2>
				<div className="flex items-center justify-end gap-4">
					<Button
						size="icon"
						className="bg-[#F2F2F2]"
						variant={"ghost"}
					>
						<Search />
					</Button>
					<Button
						className="bg-[#F2F2F2]"
						size="icon"
						variant={"ghost"}
						onClick={() =>
							orientation === "grid"
								? setOrientation("list")
								: setOrientation("grid")
						}
					>
						<Rows2 />
					</Button>
					<Button
						className="bg-[#F2F2F2]"
						size="icon"
						variant={"ghost"}
						asChild
					>
						<Link href="/all-bookings/new">
							<Plus />
						</Link>
					</Button>
				</div>
			</div>
			{bookings?.length === 0 && <NoBookings />}

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
