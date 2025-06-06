"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search } from "lucide-react";
import { SpacesListings } from "./SpacesListings";
import { NoSpaces } from "./NoSpaces";
import { ISpace } from "@/lib/database/models/space.model";
import { SpacesGrid } from "./grids/SpacesGrid";
import Link from "next/link";

export const SpacesDetails = ({ spaces }: { spaces: ISpace[] }) => {
	const [orientation, setOrientation] = useState("grid");

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-3xl lg:text-4xl">
					Your spaces
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
						<Link href="/all-spaces/new">
							<Plus />
						</Link>
					</Button>
				</div>
			</div>
			{spaces?.length === 0 && <NoSpaces />}

			{spaces?.length !== 0 && (
				<div className="mt-4">
					{orientation === "grid" && <SpacesGrid spaces={spaces} />}
					{orientation === "list" && (
						<SpacesListings spaces={spaces} />
					)}
				</div>
			)}
		</div>
	);
};
