import React from "react";
import { BookingsLists } from "./BookingsLists";
import { BookingsTable } from "./tables/BookingsTable";

export const BookingsListings = () => {
	return (
		<div className="mt-8">
			<BookingsLists />
			<BookingsTable />
		</div>
	);
};
