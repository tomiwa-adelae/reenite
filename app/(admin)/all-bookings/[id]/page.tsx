import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	Ban,
	CalendarDays,
	Car,
	CircleCheckBig,
	Clock,
	Mail,
	MapPin,
	Phone,
	Repeat2,
	Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className=" flex items-start justify-start gap-4">
						<Button
							size="icon"
							className="size-10 lg:size-12 bg-[#F7F7F7]"
							variant="ghost"
							asChild
						>
							<Link href="/all-bookings">
								<ArrowLeft className="size-4 lg:size-6" />
							</Link>
						</Button>
						<div className="flex flex-col items-start justify-start gap-1">
							<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
								Booking #BK001
							</h2>
							<Badge variant="success">Confirmed</Badge>
						</div>
					</div>
					<Button
						className="w-full md:w-auto"
						size="md"
						variant="destructive"
					>
						<Ban /> Cancel booking
					</Button>
				</div>
				<div
					className="bg-blend-overlay bg-scroll bg-no-repeat bg-cover bg-center py-16 flex items-center justify-center relative h-[50vh] rounded-2xl mt-4"
					style={{
						backgroundImage: `url(/assets/images/space-one.jpg)`,
					}}
				>
					<div className="absolute bottom-0 left-0 w-full py-4 text-white ">
						<div className="container">
							<h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
								Mini Conference Room
							</h1>
							<p className="text-sm md:text-base mt-1">
								<MapPin className="size-4 inline-block mr-2" />
								<span>123 Main Street, Ikeja, Lagos State</span>
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Space amenities</h3>
					<div className="flex flex-wrap gap-4 mt-4">
						<div className="flex items-center justify-start gap-2">
							<Wifi className="size-5 md:size-7" />{" "}
							<p className="text-sm md:text-base">Wifi</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Car className="size-5 md:size-7" />{" "}
							<p className="text-sm md:text-base">Free parking</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Wifi className="size-5 md:size-7" />{" "}
							<p className="text-sm md:text-base">Wifi</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Car className="size-5 md:size-7" />{" "}
							<p className="text-sm md:text-base">Free parking</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Wifi className="size-5 md:size-7" />{" "}
							<p className="text-sm md:text-base">Wifi</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Car className="size-5 md:size-7" />{" "}
							<p className="text-sm md:text-base">Free parking</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Booking Details</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
						<div className="flex items-center justify-start gap-2">
							<CalendarDays className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Date: 2025-05-15
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Clock className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Time: 09:00 - 12:00
							</p>
						</div>
						<div className="flex items-center justify-start gap-2">
							<Repeat2 className="size-5 text-muted-foreground" />
							<p className="text-sm md:text-base text-muted-foreground">
								Duration: 4 days
							</p>
						</div>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">
						Customer Information
					</h3>
					<div className="grid mt-4 gap-4">
						<div className="flex items-center justify-start gap-2">
							<Image
								src={"/assets/images/user-one.jpeg"}
								alt="User"
								width={1000}
								height={1000}
								className="size-[40px] lg:size-[50px] object-cover rounded-full"
							/>
							<h4 className="font-medium text-base lg:text-lg">
								Tomiwa Adelae
							</h4>
						</div>
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
						<Button size="md" className="w-full">
							<Phone className="size-5 mr-2" />
							Contact customer
						</Button>
					</div>
				</div>
				<div className="p-4 md:p-8 mt-4 rounded-2xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
					<h3 className="font-medium text-lg">Payment Information</h3>
					<div className="grid gap-4 mt-4">
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">Amount</p>
							<p>₦158,000</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Transaction ID
							</p>
							<p>TXN_202512374744</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">
								Payment date
							</p>
							<p>2025-05-20</p>
						</div>
						<div className="flex text-sm md:text-base items-center justify-between gap-4">
							<p className="text-muted-foreground">Status</p>
							<p className="text-green-400">
								<CircleCheckBig className="size-3 lg:size-5 inline-block mr-2" />
								Paid
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
