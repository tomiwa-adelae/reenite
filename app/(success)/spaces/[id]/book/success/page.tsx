import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className="bg-[#F5F4F7] py-16 flex items-center justify-center min-h-screen">
			<div className="container grid grid-cols-1 lg:grid-cols-5 gap-8">
				<div className="text-center md:text-left col-span-3">
					<div className="flex items-center md:justify-start justify-center">
						<Logo />
					</div>
					<h1
						style={{ fontFamily: "ClashDisplay" }}
						className="text-4xl md:text-5xl lg:text-6xl mt-6 mb-4 font-bold"
					>
						Booking confirmed successfully!
					</h1>
					<p className="text-sm text-muted-foreground lg:text-base leading-relaxed font-medium">
						Thank you for choosing to book with Reenite! Your
						reservation is confirmed. If there is anything you need
						before your arrival, please don't hesitate to reach out
						to us.
					</p>
					<div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
						<Button className="w-full md:w-auto" asChild size="lg">
							<Link href="/">View booking details</Link>
						</Button>
						<Button
							asChild
							variant={"ghost"}
							className="underline hover:bg-white w-full md:w-auto"
							size="lg"
						>
							<Link href="/">Go back to home</Link>
						</Button>
					</div>
				</div>
				<div className="col-span-3 lg:col-span-2 grid gap-6">
					<div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl bg-white px-8 flex items-center justify-between gap-4 py-6">
						<div>
							<h2
								style={{ fontFamily: "ClashDisplay" }}
								className="font-bold text-3xl"
							>
								₦21,393
							</h2>
							<p className="text-sm md:text-base text-muted-foreground">
								Payment success!
							</p>
						</div>
						<div className="bg-primary rounded-full p-4">
							<Image
								src={"/assets/icons/check.svg"}
								alt={"Check icon"}
								width={1000}
								height={1000}
								className="size-[40px] object-cover invert"
							/>
						</div>
					</div>
					<div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl bg-white p-8">
						<h2 className="font-medium text-xl md:text-2xl">
							Booking summary
						</h2>
						<div className="space-y-6 mt-4 text-sm text-muted-foreground">
							<p className="flex items-center justify-between gap-4">
								Space:{" "}
								<span className="text-black font-semibold">
									Mini Conference room
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								Date:{" "}
								<span className="text-black font-semibold">
									Wednesday, May 29, 2025
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								Time:{" "}
								<span className="text-black font-semibold">
									10:00 AM – 2:00 PM
								</span>
							</p>
							<p className="flex items-center justify-between gap-4">
								Booking ID:{" "}
								<span className="text-black font-semibold">
									#REN-348928
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
