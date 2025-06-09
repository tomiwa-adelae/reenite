import React from "react";
import { SpacesLists } from "./SpacesLists";
import { SpacesTable } from "./tables/SpacesTable";
import { ISpace } from "@/lib/database/models/space.model";

export const SpacesListings = ({
	spaces,
	userId,
}: {
	spaces: ISpace[];
	userId: string;
}) => {
	return (
		<div>
			<SpacesLists spaces={spaces} userId={userId} />
			<SpacesTable spaces={spaces} userId={userId} />
		</div>
	);
};
