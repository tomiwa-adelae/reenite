import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Activity,
	ArrowLeft,
	Ban,
	Briefcase,
	Building2,
	Calendar,
	ChevronRight,
	CreditCard,
	Hash,
	Info,
	Mail,
	MapPin,
	Pen,
	Phone,
	X,
} from "lucide-react";
import Image from "next/image";
import { Bookings } from "./components/Bookings";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { getCustomerDetails } from "@/lib/actions/admin/customer.actions";
import Link from "next/link";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { formatDate } from "@/lib/utils";
import { DeleteCustomerButton } from "./components/DeleteCustomerButton";
import { SuspendCustomerButton } from "./components/SuspendCustomerButton";
import { UnsuspendCustomerButton } from "./components/UnsuspendCustomerButton";
import { BackButton } from "@/components/shared/BackButton";

const page = async ({ params }: { params: any }) => {
	const { id } = await params;

	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	const customer = await getCustomerDetails({
		userId: user?.user?._id,
		customerId: id,
	});

	return (
		<div className="py-8">
			<div className="container">
				<div className="flex items-start md:items-center justify-between gap-4">
					<div className=" flex items-center justify-start gap-4">
						<BackButton slug={"/all-users"} />
						<h2 className="font-semibold text-3xl lg:text-4xl">
							{customer?.customer?.userId}
						</h2>
					</div>
					<div className="grid grid-cols-1 w-auto gap-4">
						<Button asChild className="w-full md:w-auto" size="md">
							<Link
								href={`mailto:${customer?.customer?.email}`}
								className=""
							>
								<Mail />{" "}
								<span className="hidden md:inline-block">
									Message {customer?.customer?.firstName}
								</span>
							</Link>
						</Button>
						{/* <Button
							className="w-full md:w-auto"
							size="md"
							variant="black"
						>
							<Pen />{" "}
							<span className="hidden md:inline-block">
								Edit profile
							</span>
						</Button> */}
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex flex-col md:flex-row items-center justify-start gap-4">
					<Image
						src={
							customer?.customer?.picture ||
							DEFAULT_PROFILE_PICTURE
						}
						alt={
							`${customer?.customer?.firstName}'s name` ||
							"User profile picture"
						}
						width={1000}
						height={1000}
						className="size-[250px] object-cover rounded-full mx-auto md:mx-0"
					/>
					<div className="space-y-1 text-center md:text-left mt-4">
						<h4 className="font-medium text-2xl md:text-3xl">
							{customer?.customer?.firstName}{" "}
							{customer?.customer?.lastName}
						</h4>
						<Badge
							variant={
								customer?.customer?.status === "active"
									? "success"
									: "destructive"
							}
							className="capitalize"
						>
							{customer?.customer?.status}
						</Badge>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Booking history</h3>
					{customer?.bookings.length !== 0 && (
						<Bookings bookings={customer?.bookings} />
					)}
					{customer?.bookings.length === 0 && (
						<div className="mt-4 flex flex-col items-center justify-center">
							<Image
								src={"/assets/icons/folder.svg"}
								alt="Folder icon"
								width={1000}
								height={1000}
								className="size-[100px] object-cover"
							/>
							<p className="text-muted-foreground text-center text-base mt-4 mb-6">
								{customer?.customer?.firstName}{" "}
								{customer?.customer?.lastName} has not booked
								any space yet.
							</p>
						</div>
					)}
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">
						Customer Information
					</h3>
					<div className="grid mt-4 gap-4">
						<div className="text-sm md:text-base">
							<p>
								<Hash className="size-4 md:size-5 inline-block mr-2" />
								<span>
									{customer?.customer?.userId ? (
										customer?.customer?.userId
									) : (
										<span className="italic">
											No userID
										</span>
									)}
								</span>
							</p>
						</div>
						<div className="text-sm md:text-base">
							<a href={`mailto:${customer?.customer?.email}`}>
								<Mail className="size-4 md:size-5 inline-block mr-2" />
								<span>
									{customer?.customer?.email ? (
										customer?.customer?.email
									) : (
										<span className="italic">No email</span>
									)}
								</span>
							</a>
						</div>
						<a
							href={`tel:${customer?.customer?.phoneNumber}`}
							className="text-sm md:text-base"
						>
							<p>
								<Phone className="size-4 md:size-5 inline-block mr-2" />
								<span>
									{customer?.customer?.phoneNumber ? (
										customer?.customer?.phoneNumber
									) : (
										<span className="italic">
											No phone number
										</span>
									)}
								</span>
							</p>
						</a>
						<p>
							<MapPin className="size-4 md:size-5 inline-block mr-2" />
							<span>
								{customer?.customer?.address &&
								customer?.customer?.state &&
								customer?.customer?.city &&
								customer?.customer?.country ? (
									<span>
										{customer?.customer?.address},{" "}
										{customer?.customer?.state},{" "}
										{customer?.customer?.city},{" "}
										<span className="capitalize">
											{customer?.customer?.country}
										</span>
									</span>
								) : (
									"No location"
								)}
							</span>
						</p>
						<p>
							<Activity className="size-4 md:size-5 inline-block mr-2" />
							<span className="capitalize">
								{customer?.customer?.status ? (
									customer?.customer?.status
								) : (
									<span className="italic">No status</span>
								)}
							</span>
						</p>
						<p>
							<Calendar className="size-4 md:size-5 inline-block mr-2" />
							<span>
								Joined:{" "}
								{formatDate(customer?.customer?.createdAt)}
							</span>
						</p>
						<p>
							<Briefcase className="size-4 md:size-5 inline-block mr-2" />
							<span>
								{customer?.customer?.occupation ? (
									customer?.customer?.occupation
								) : (
									<span className="italic">
										No occupation
									</span>
								)}
							</span>
						</p>
						<p>
							<Building2 className="size-4 md:size-5 inline-block mr-2" />
							<span>
								{customer?.customer?.company ? (
									customer?.customer?.company
								) : (
									<span className="italic">No company</span>
								)}
							</span>
						</p>
						<p>
							<Info className="size-4 md:size-5 inline-block mr-2" />
							<span>
								{customer?.customer?.bio ? (
									customer?.customer?.bio
								) : (
									<span className="italic">No bio</span>
								)}
							</span>
						</p>
						<Button asChild size="md" className="w-full">
							<a href={`tel:${customer?.customer?.phoneNumber}`}>
								<Phone className="size-5 mr-2" />
								Contact User
							</a>
						</Button>
					</div>
				</div>
				<div className="border border-destructive p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg text-destructive">
						Danger Zone
					</h3>
					<div className="grid grid-cols-2 gap-4 mt-4">
						<DeleteCustomerButton
							customerId={customer?.customer?._id}
							userId={user?.user?._id}
						/>
						{customer?.customer?.status === "active" && (
							<SuspendCustomerButton
								customerId={customer?.customer?._id}
								userId={user?.user?._id}
							/>
						)}
						{customer?.customer?.status === "suspended" && (
							<UnsuspendCustomerButton
								customerId={customer?.customer?._id}
								userId={user?.user?._id}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
