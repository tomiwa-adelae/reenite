import { UsersTable } from "./tables/UsersTable";
import { UsersLists } from "./UsersLists";

export const UsersListings = () => {
	return (
		<div>
			<UsersLists />
			<UsersTable />
		</div>
	);
};
