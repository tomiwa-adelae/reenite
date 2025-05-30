"use client";
import React, { useState } from "react";
import { Footer } from "@/app/(new)/components/Footer";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { availableAmenities } from "@/constants";
import * as Icons from "lucide-react";

export const PhotosForm = () => {
	return (
		<div className="mt-8">
			<div className="container max-w-3xl">
				<div className="col-span-4 border-2 bg-[#F7F7F7] border-dashed rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] hover:border-black transition-all cursor-pointer">
					<Image
						src={"/assets/icons/camera.avif"}
						alt={"camera icon"}
						width={1000}
						height={1000}
						className="size-[200px] object-cover"
					/>
					<Button size="md" variant={"outline"}>
						Add photos
					</Button>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<div className="border-2 border-dashed flex items-center justify-center col-span-1 p-8 min-h-[200px] rounded-xl bg-[#F7F7F7] hover:border-black transition-all cursor-pointer">
						<ImageIcon className="size-6" />
					</div>
					<div className="border-2 border-dashed flex items-center justify-center col-span-1 p-8 min-h-[200px] rounded-xl bg-[#F7F7F7] hover:border-black transition-all cursor-pointer">
						<ImageIcon className="size-6" />
					</div>
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
						<Link href="/all-spaces/new/structure">Back</Link>
					</Button>
					<Button size="lg">Next</Button>
				</div>
			</Footer>
		</div>
	);
};
