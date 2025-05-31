import React from "react";
import { SpacesLists } from "./SpacesLists";
import { SpacesTable } from "./tables/SpacesTable";

export const SpacesListings = () => {
	return (
		<div className="mt-8">
			<SpacesLists />
			<SpacesTable />
		</div>
	);
};
