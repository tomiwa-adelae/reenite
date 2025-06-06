import { IUser } from "@/lib/database/models/user.model";
import { UsersTable } from "./tables/UsersTable";
import { UsersLists } from "./UsersLists";

export const UsersListings = ({ customers }: { customers: any }) => {
	return (
		<div>
			<UsersLists customers={customers} />
			<UsersTable customers={customers} />
		</div>
	);
};
