import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	Ban,
	ChevronRight,
	CreditCard,
	Mail,
	MapPin,
	Pen,
	Phone,
	X,
} from "lucide-react";
import Image from "next/image";
import { Bookings } from "./components/Bookings";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className=" flex items-center justify-start gap-4">
						<Button
							size="icon"
							className="size-12 bg-[#F7F7F7]"
							variant="ghost"
						>
							<ArrowLeft className="size-6" />
						</Button>
						<h2 className="font-semibold text-3xl lg:text-4xl">
							User-123555454
						</h2>
					</div>
					<div className="grid grid-cols-3 w-full md:w-auto gap-4">
						<Button className="w-full md:w-auto" size="md">
							<Mail />{" "}
							<span className="hidden md:inline-block">
								Message user
							</span>
						</Button>
						<Button
							className="w-full md:w-auto"
							size="md"
							variant="black"
						>
							<Pen />{" "}
							<span className="hidden md:inline-block">
								Edit profile
							</span>
						</Button>
						<Button
							className="w-full md:w-auto"
							size="md"
							variant="destructive"
						>
							<Ban />{" "}
							<span className="hidden md:inline-block">
								Suspend user
							</span>
						</Button>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex flex-col md:flex-row items-center justify-start gap-4">
					<Image
						src={"/assets/images/user-one.jpeg"}
						alt={"User"}
						width={1000}
						height={1000}
						className="size-[250px] object-cover rounded-full mx-auto md:mx-0"
					/>
					<div className="space-y-1 text-center md:text-left mt-4">
						<h4 className="font-medium text-2xl md:text-3xl">
							Tomiwa Adelae
						</h4>
						<p className="text-sm md:text-base text-muted-foreground">
							tomiwaadelae@gmail.com
						</p>
						<p className="text-muted-foreground text-sm md:text-base">
							ID: USER-20339347753
						</p>
						<p className="text-muted-foreground text-sm md:text-base">
							Status: Active
						</p>
						<p className="text-muted-foreground text-sm md:text-base">
							Joined: 2025-05-20
						</p>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Booking history</h3>
					<Bookings />
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">
						Customer Information
					</h3>
					<div className="grid mt-4 gap-4">
						<div className="text-sm md:text-base">
							<p>
								<Mail className="size-4 md:size-5 inline-block mr-2" />
								<span>adelaetomiwa6@gmail.com</span>
							</p>
						</div>
						<div className="text-sm md:text-base">
							<p>
								<Phone className="size-4 md:size-5 inline-block mr-2" />
								<span>+234 801 234 5678</span>
							</p>
						</div>
						<p>
							<MapPin className="size-4 md:size-5 inline-block mr-2" />
							<span>
								123 Business Ave, Suite 456, New York, NY 10001
							</span>
						</p>
						<Button size="md" className="w-full">
							<Phone className="size-5 mr-2" />
							Contact User
						</Button>
					</div>
				</div>
				<div className="border border-destructive p-4 md:p-8 mt-4 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg text-destructive">
						Danger Zone
					</h3>
					<div className="grid gap-4 mt-4">
						<Button variant={"destructive"} size="md">
							<X />
							Delete user account
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
