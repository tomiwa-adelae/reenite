import { NoUsers } from "../components/NoUsers";
import { UsersGrid } from "../components/grids/UsersGrid";
import { UsersListings } from "../components/UsersListings";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { getCustomers } from "@/lib/actions/admin/customer.actions";
import { CustomersDetails } from "../components/CustomersDetails";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const customers = await getCustomers({ userId: user?.user?._id });
	return (
		<div className="py-8">
			<div className="container">
				<CustomersDetails customers={customers.customers} />
			</div>
		</div>
	);
};

export default page;
