import { NoUsers } from "../components/NoUsers";
import { UsersGrid } from "../components/grids/UsersGrid";
import { UsersListings } from "../components/UsersListings";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
					Your customers
				</h2>

				{/* <NoUsers /> */}
				{/* <UsersGrid /> */}
				<div className="mt-2">
					<UsersListings />
				</div>
			</div>
		</div>
	);
};

export default page;
