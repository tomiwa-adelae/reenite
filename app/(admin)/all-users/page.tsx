import { NoUsers } from "../components/NoUsers";
import { UsersGrid } from "../components/UsersGrid";
import { UsersListings } from "../components/UsersListings";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<h2 className="font-semibold text-3xl lg:text-4xl">
					Your users
				</h2>

				{/* <NoUsers /> */}
				{/* <UsersGrid /> */}
				<UsersListings />
			</div>
		</div>
	);
};

export default page;
