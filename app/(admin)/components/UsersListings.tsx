import { UsersTable } from "./tables/UsersTable";
import { UsersLists } from "./UsersLists";

export const UsersListings = () => {
	return (
		<div className="mt-8">
			<UsersLists />
			<UsersTable />
		</div>
	);
};
