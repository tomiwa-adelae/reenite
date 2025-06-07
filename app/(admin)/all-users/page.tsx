import { NoUsers } from "../components/NoUsers";
import { UsersGrid } from "../components/grids/UsersGrid";
import { UsersListings } from "../components/UsersListings";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getCustomers } from "@/lib/actions/admin/customer.actions";
import { CustomersDetails } from "../components/CustomersDetails";
import Pagination from "@/components/shared/Pagination";
import { DEFAULT_LIMIT } from "@/constants";

const page = async ({ searchParams }: { searchParams: any }) => {
	const { query, page } = await searchParams;

	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const customers = await getCustomers({
		userId: user?.user?._id,
		query,
		page,
		limit: DEFAULT_LIMIT,
	});
	return (
		<div className="py-8">
			<div className="container">
				<CustomersDetails
					query={query}
					customers={customers.customers}
				/>
				{customers?.totalPages! > 1 && (
					<Pagination
						totalPages={customers?.totalPages}
						page={page}
					/>
				)}
			</div>
		</div>
	);
};

export default page;
