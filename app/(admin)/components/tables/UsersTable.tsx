import Image from "next/image";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/database/models/user.model";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";

export function UsersTable({ customers }: { customers: IUser[] }) {
	return (
		<div className="hidden md:block">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone number</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers.map((customer, index) => (
						<TableRow className="group" key={index}>
							<TableCell className="flex items-center justify-start gap-4">
								<Image
									src={
										customer.picture ||
										DEFAULT_PROFILE_PICTURE
									}
									alt={`${customer.firstName}'s picture`}
									width={1000}
									height={1000}
									className="size-[70px] object-cover rounded-2xl"
								/>
								<h5 className="font-medium text-base">
									{customer.firstName} {customer.lastName}
								</h5>
							</TableCell>
							<TableCell>{customer.email}</TableCell>
							<TableCell>
								{customer.phoneNumber ? (
									customer.phoneNumber
								) : (
									<p className="italic">No phone number</p>
								)}
							</TableCell>
							<TableCell>
								<div className="flex items-center justify-end">
									<Button variant={"ghost"} size="icon">
										<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
