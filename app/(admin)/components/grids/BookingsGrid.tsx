import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

export const BookingsGrid = () => {
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div>
				<Image
					src={"/assets/images/space-one.jpg"}
					alt={"Space one"}
					width={1000}
					height={1000}
					className="aspect-video object-cover rounded-xl"
				/>
				<h4 className="text-lg font-medium mt-4">
					Mini conference room
				</h4>
				<p className="text-sm text-muted-foreground">
					123 Main Street, Abuja
				</p>
				<Separator className="my-2" />
				<div className="flex items-center justify-start gap-2 mt-4">
					<Image
						src={"/assets/images/user-one.jpeg"}
						alt={"User"}
						width={1000}
						height={1000}
						className="size-[30px] object-cover rounded-full"
					/>
					<div>
						<h4 className="text-base font-medium">Adelae Tomiwa</h4>
					</div>
				</div>
			</div>
		</div>
	);
};
