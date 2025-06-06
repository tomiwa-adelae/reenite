"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search } from "lucide-react";
import { NoUsers } from "./NoUsers";
import { ISpace } from "@/lib/database/models/space.model";
import Link from "next/link";
import { UsersListings } from "./UsersListings";
import { UsersGrid } from "./grids/UsersGrid";

export const CustomersDetails = ({ customers }: { customers: ISpace[] }) => {
	const [orientation, setOrientation] = useState("grid");

	return (
		<div>
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-semibold text-3xl lg:text-4xl">
					Your customers
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
						<Link href="/all-users/new">
							<Plus />
						</Link>
					</Button>
				</div>
			</div>
			{customers?.length === 0 && <NoUsers />}

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
