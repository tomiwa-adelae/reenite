import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BookingsLists = () => {
	return (
		<div className="md:hidden">
			<Link
				href="/all-bookings/12345"
				className="hover:bg-[#F7F7F7] transition-all p-2 rounded-2xl flex items-center justify-start gap-4 group cursor-pointer"
			>
				<Image
					src={"/assets/images/space-one.jpg"}
					alt={"Space"}
					width={1000}
					height={1000}
					className="size-[70px] object-cover rounded-2xl"
				/>
				<div className="flex-1 flex items-center justify-between gap-2">
					<div className="flex-1">
						<h5 className="text-base font-medium">
							Mini conference room
						</h5>
						<p className="text-sm text-muted-foreground">
							Adelae tomiwa - adelaetomiwa6@gmail.com
						</p>
					</div>
					<Button variant={"ghost"} size="icon">
						<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
					</Button>
				</div>
			</Link>
		</div>
	);
};
