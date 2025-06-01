"use client";
import React, { useState } from "react";
import { Footer } from "@/app/(new)/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { availableAmenities } from "@/constants";
import * as Icons from "lucide-react";

export const AmenitiesForm = () => {
	return (
		<div>
			<div className="container max-w-3xl">
				<div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
					{availableAmenities.map(({ icon, name }, index) => {
						const Icon = icon;
						return (
							<div
								key={index}
								className="border-2 rounded-2xl p-6 flex flex-col items-start justify-center gap-2 cursor-pointer hover:border-black hover:border-2 transition-all"
							>
								<Icon className="size-6 lg:size-7" />
								<h5 className="font-medium text-base lg:text-lg">
									{name}
								</h5>
							</div>
						);
					})}
				</div>
			</div>
			<Footer>
				<div className="container flex items-center justify-between gap-4">
					<Button
						className="underline"
						variant={"ghost"}
						asChild
						size="lg"
					>
						<Link href="/all-spaces/new/location">Back</Link>
					</Button>
					<Button asChild size="lg">
						<Link href="/all-spaces/new/photos">Next</Link>
					</Button>
				</div>
			</Footer>
		</div>
	);
};
