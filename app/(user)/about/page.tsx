import React from "react";
import { NoBookings } from "@/components/shared/NoBookings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NoAboutDetails } from "../components/NoAboutDetails";
import { BriefcaseBusiness, Pen } from "lucide-react";

const page = () => {
	return (
		<div>
			<div className="container">
				<h2 className="font-semibold text-2xl lg:text-3xl flex items-center justify-start">
					<span>About me </span>
					<Button
						size="sm"
						asChild
						variant={"ghost"}
						className="bg-[#F2F2F2] px-4 py-4 rounded-lg ml-3 font-semibold"
					>
						<Link href="/about/edit">
							<Pen className="size-4 mr-1" /> Edit
						</Link>
					</Button>
				</h2>
				<div className="mt-4 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4">
						<div className="bg-primary rounded-full text-white size-[120px] p-8 flex items-center justify-center">
							<h2 className="text-6xl font-bold">A</h2>
						</div>
						<h2 className="font-semibold text-3xl">
							Adelae Tomiwa
						</h2>
					</div>
					<NoAboutDetails />
				</div>
				<div className="mt-10 space-y-4">
					<p className="text-base lg:text-lg">
						<BriefcaseBusiness className="size-6 inline-block mr-3" />
						<span>My work: Website developer</span>
					</p>
					<p className="text-base lg:text-lg">
						<BriefcaseBusiness className="size-6 inline-block mr-3" />
						<span>Website developer</span>
					</p>
					<p className="text-base lg:text-lg mt-6">
						I am the funniest guy in the entire planet. Trust me,
						you would have a nice time with me
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
