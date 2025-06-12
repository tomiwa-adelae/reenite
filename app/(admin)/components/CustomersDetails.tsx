"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus, Rows2, Search } from "lucide-react";
import { NoUsers } from "./NoUsers";
import { ISpace } from "@/lib/database/models/space.model";
import Link from "next/link";
import { UsersListings } from "./UsersListings";
import { UsersGrid } from "./grids/UsersGrid";
import { SearchBar } from "@/components/forms/SearchBar";

export const CustomersDetails = ({
	customers,
	query,
}: {
	customers: ISpace[];
	query: string;
}) => {
	const [orientation, setOrientation] = useState<"grid" | "list">("grid");

	const [showSearch, setShowSearch] = useState(false);

	// Load orientation from localStorage on mount (client-only)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("customer-orientation");
			if (saved === "grid" || saved === "list") {
				setOrientation(saved);
			}
		}
	}, []);

	// Save orientation to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("customer-orientation", orientation);
		}
	}, [orientation]);

	const toggleOrientation = () => {
		setOrientation((prev) => (prev === "grid" ? "list" : "grid"));
	};

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					Your customers
				</h2>
				<div className="flex items-center justify-end gap-4">
					{customers?.length !== 0 && (
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

					{/* <Button
						className="bg-[#F2F2F2]"
						size="icon"
						variant={"ghost"}
						asChild
					>
						<Link href="/all-users/new">
							<Plus />
						</Link>
					</Button> */}
				</div>
			</div>
			{showSearch && (
				<SearchBar
					placeholder="Search customer by name, email, phone number..."
					onClose={() => setShowSearch(false)}
				/>
			)}
			{customers?.length === 0 && (
				<NoUsers description={query && "No user found"} />
			)}

			{customers?.length !== 0 && (
				<div className="mt-4">
					{orientation === "grid" && (
						<UsersGrid customers={customers} />
					)}
					{orientation === "list" && (
						<UsersListings customers={customers} />
					)}
				</div>
			)}
		</div>
	);
};
