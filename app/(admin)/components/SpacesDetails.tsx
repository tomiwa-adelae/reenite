"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search, LayoutGrid } from "lucide-react";
import { SpacesListings } from "./SpacesListings";
import { NoSpaces } from "./NoSpaces";
import { ISpace } from "@/lib/database/models/space.model";
import { SpacesGrid } from "./grids/SpacesGrid";
import Link from "next/link";
import { SearchBar } from "@/components/forms/SearchBar";

export const SpacesDetails = ({
	spaces,
	query,
	userId,
}: {
	spaces: ISpace[];
	query?: string;
	userId: string;
}) => {
	const [orientation, setOrientation] = useState<"grid" | "list">("grid");
	const [showSearch, setShowSearch] = useState(false);

	// Load orientation from localStorage on mount
	useEffect(() => {
		const savedOrientation = localStorage.getItem("spaces-orientation");
		if (savedOrientation === "grid" || savedOrientation === "list") {
			setOrientation(savedOrientation);
		}
	}, []);

	// Save orientation to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("spaces-orientation", orientation);
	}, [orientation]);

	const toggleOrientation = () => {
		setOrientation((prev) => (prev === "grid" ? "list" : "grid"));
	};

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
					Your spaces
				</h2>
				<div className="flex items-center justify-end gap-4">
					{spaces?.length !== 0 && (
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

					<Button
						className="bg-[#F2F2F2]"
						size="icon"
						variant={"ghost"}
						asChild
					>
						<Link href="/all-spaces/new">
							<Plus />
						</Link>
					</Button>
				</div>
			</div>
			{showSearch && (
				<SearchBar
					placeholder="Search spaces by name, location..."
					onClose={() => setShowSearch(false)}
				/>
			)}
			{spaces?.length === 0 && (
				<NoSpaces description={query && "No space found"} />
			)}

			{spaces?.length !== 0 && (
				<div className="mt-4">
					{orientation === "grid" && (
						<SpacesGrid spaces={spaces} userId={userId} />
					)}
					{orientation === "list" && (
						<SpacesListings spaces={spaces} userId={userId} />
					)}
				</div>
			)}
		</div>
	);
};
