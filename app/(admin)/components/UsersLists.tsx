import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const UsersLists = () => {
	return (
		<div className="md:hidden">
			<div className="hover:bg-[#F7F7F7] transition-all p-2 rounded-xl flex items-center justify-start gap-4 group cursor-pointer">
				<Image
					src={"/assets/images/user-one.jpeg"}
					alt={"User"}
					width={1000}
					height={1000}
					className="size-[70px] object-cover rounded-xl"
				/>
				<div className="flex-1 flex items-center justify-between gap-2">
					<div className="flex-1">
						<h5 className="text-base font-medium">Tomiwa Adelae</h5>
						<p className="text-sm text-muted-foreground">
							adelaetomiwa6@gmail.com
						</p>
					</div>
					<ChevronRight className="size-6 opacity-0 group-hover:opacity-100 transition-all" />
				</div>
			</div>
		</div>
	);
};
