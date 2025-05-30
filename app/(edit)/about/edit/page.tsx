import { Button } from "@/components/ui/button";
import {
	BriefcaseBusiness,
	Building2,
	Camera,
	CircleUser,
	Mail,
	MapPinHouse,
	Phone,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { AboutBox } from "../../components/AboutBox";

const page = () => {
	return (
		<div className="py-8">
			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
				<div className="lg:col-span-2">
					<div className="relative flex flex-col items-center justify-center">
						<Image
							src={"/assets/images/user-one.jpeg"}
							alt={"User image"}
							width={1000}
							height={1000}
							className="size-[250px] object-cover rounded-full"
						/>
						<Button
							size="sm"
							variant={"white"}
							className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute bottom-[-15px] px-4"
						>
							<Camera /> Edit
						</Button>
					</div>
				</div>
				<div className="col-span-3 mt-8 lg:mt-0">
					<h2 className="font-semibold text-3xl lg:text-4xl flex items-center justify-start">
						My profile
					</h2>
					<div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-4">
						<AboutBox icon={CircleUser} placeHolder="My name" />
						<AboutBox icon={Mail} placeHolder="My email" />
						<AboutBox icon={Phone} placeHolder="My phone number" />
						<AboutBox
							icon={BriefcaseBusiness}
							placeHolder="My work"
						/>
						<AboutBox
							icon={MapPinHouse}
							placeHolder="My location"
						/>
						<AboutBox icon={Building2} placeHolder="My company" />
					</div>
					<div className="mt-6">
						<h2 className="font-semibold text-3xl">About me</h2>
						<div className="mt-4 border-2 border-dashed rounded-xl px-4 py-6">
							<p className="text-base text-muted-foreground">
								Write something short and fun about yourself.
							</p>
							<p className="mt-1 cursor-pointer underline font-semibold hover:text-secondary text-lg">
								Add intro
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
