import { Building, CalendarDays, TrendingUp, Users } from "lucide-react";
import { DashboardBox } from "./DashboardBox";
import { ISpace } from "@/lib/database/models/space.model";
import { IUser } from "@/lib/database/models/user.model";

interface Props {
	customers: IUser[];
	spaces: ISpace[];
}

export const DashboardAnalytics = ({ spaces, customers }: Props) => {
	return (
		<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<DashboardBox
				title={"Total users"}
				titleIcon={Users}
				number={customers?.length}
				icon={TrendingUp}
				slug="/all-users"
			/>
			<DashboardBox
				title={"Total bookings"}
				titleIcon={CalendarDays}
				number={"89"}
				icon={TrendingUp}
				slug="/all-bookings"
			/>
			<DashboardBox
				title={"Total spaces"}
				titleIcon={Building}
				number={spaces?.length}
				icon={TrendingUp}
				slug="/all-spaces"
			/>
		</div>
	);
};
