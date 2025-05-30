import React from "react";
import { SpacesLists } from "./SpacesLists";
import { SpacesTable } from "./SpacesTable";

export const SpacesListings = () => {
	return (
		<div className="mt-8">
			<SpacesLists />
			<SpacesTable />
		</div>
	);
};
