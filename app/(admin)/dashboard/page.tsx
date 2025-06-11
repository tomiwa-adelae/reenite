import React from "react";
import { NoAdminData } from "../components/NoAdminData";
import { DashboardAnalytics } from "../components/DashboardAnalytics";
import { BookingsListings } from "../components/BookingsListings";
import { TopSpaces } from "../components/TopSpaces";
import { UsersListings } from "../components/UsersListings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building, Plus, Users } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getCustomers } from "@/lib/actions/admin/customer.actions";
import { NoCustomers } from "../components/NoCustomers";
import { getSpaces, getTopSpaces } from "@/lib/actions/admin/space.actions";
import { getBookings } from "@/lib/actions/admin/booking.actions";
import { NoBookings } from "../components/NoBookings";
import { NoSpaces } from "../components/NoSpaces";

const page = async () => {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const customers = await getCustomers({ userId: user?.user?._id });
	const spaces = await getSpaces({ userId: user?.user?._id });
	const topSpaces = await getTopSpaces({ userId: user?.user?._id });
	const bookings = await getBookings({ userId: user?.user?._id });

	return (
		<div className="py-8">
			<div className="container">
				{spaces?.spaces?.length === 0 && <NoAdminData />}
				{spaces?.spaces?.length !== 0 && (
					<div>
						<h2 className="font-semibold text-2xl md:text-3xl">
							Welcome back, {user?.user?.firstName}
						</h2>
						<DashboardAnalytics
							spaces={spaces?.spaces}
							customers={customers?.customers}
							bookings={bookings?.bookings}
						/>
						<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
							<h3 className="font-medium text-base md:text-lg">
								Recent bookings
							</h3>
							{bookings?.bookings?.length === 0 && <NoBookings />}
							{bookings?.bookings?.length !== 0 && (
								<div className="mt-2">
									<BookingsListings
										bookings={bookings?.bookings}
									/>
								</div>
							)}
						</div>
						<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
							<h3 className="font-medium text-base md:text-lg">
								Top performing spaces
							</h3>
							{topSpaces?.spaces?.length === 0 && (
								<NoSpaces
									description="No spaces to display"
									showButton={false}
								/>
							)}
							{topSpaces?.spaces?.length !== 0 && (
								<div className="mt-2">
									<TopSpaces spaces={topSpaces?.spaces} />
								</div>
							)}
						</div>
						<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
							<h3 className="font-medium text-base md:text-lg">
								Recent users
							</h3>
							{customers?.customers.length === 0 && (
								<NoCustomers />
							)}
							{customers?.customers.length !== 0 && (
								<div className="mt-2">
									<UsersListings
										customers={customers?.customers}
									/>
								</div>
							)}
						</div>
						<div className="p-4 md:p-8 mt-4 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
							<h3 className="font-medium text-base md:text-lg">
								Quick actions
							</h3>
							<div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								<Button
									className="rounded-lg"
									size="lg"
									variant={"outline"}
									asChild
								>
									<Link
										href="/all-spaces/new"
										className="flex items-center justify-center flex-col gap-2 py-16"
									>
										<Plus className="size-5" />
										<span>Add new space</span>
									</Link>
								</Button>
								<Button
									className="rounded-lg"
									size="lg"
									variant={"outline"}
									asChild
								>
									<Link
										href="/all-users"
										className="flex items-center justify-center flex-col gap-2 py-16"
									>
										<Users className="size-5" />
										<span>Manage users</span>
									</Link>
								</Button>
								<Button
									className="rounded-lg"
									size="lg"
									variant={"outline"}
									asChild
								>
									<Link
										href="/all-bookings"
										className="flex items-center justify-center flex-col gap-2 py-16"
									>
										<Building className="size-5" />
										<span>Manage bookings</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
