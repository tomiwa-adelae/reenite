import React from "react";
import { BookingsLists } from "./BookingsLists";
import { BookingsTable } from "./tables/BookingsTable";

export const BookingsListings = () => {
	return (
		<div>
			<BookingsLists />
			<BookingsTable />
		</div>
	);
};
