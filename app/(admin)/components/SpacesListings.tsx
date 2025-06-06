import React from "react";
import { SpacesLists } from "./SpacesLists";
import { SpacesTable } from "./tables/SpacesTable";
import { ISpace } from "@/lib/database/models/space.model";

export const SpacesListings = ({ spaces }: { spaces: ISpace[] }) => {
	return (
		<div>
			<SpacesLists spaces={spaces} />
			<SpacesTable spaces={spaces} />
		</div>
	);
};
