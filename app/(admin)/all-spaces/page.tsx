import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Rows2, Search } from "lucide-react";
import { SpacesListings } from "../components/SpacesListings";

const page = () => {
	return (
		<div className="py-8">
			<div className="container">
				<div className="flex items-center justify-between gap-4">
					<h2 className="font-semibold text-3xl lg:text-4xl">
						Your spaces
					</h2>
					<div className="flex items-center justify-end gap-4">
						<Button
							size="icon"
							className="bg-[#F2F2F2]"
							variant={"ghost"}
						>
							<Search />
						</Button>
						<Button
							className="bg-[#F2F2F2]"
							size="icon"
							variant={"ghost"}
						>
							<Rows2 />
						</Button>
						<Button
							className="bg-[#F2F2F2]"
							size="icon"
							variant={"ghost"}
						>
							<Plus />
						</Button>
					</div>
				</div>
				{/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div>
						<Image
							src={"/assets/images/space-one.jpg"}
							alt={"SPace one"}
							width={1000}
							height={1000}
							className="aspect-square object-cover rounded-xl"
						/>
						<h4 className="text-xl font-medium mt-4">
							Mini conference room
						</h4>
						<p className="text-base text-muted-foreground mt-1">
							123 Main Street, Abuja
						</p>
					</div>
				</div> */}
				{/* <NoSpaces /> */}
				<SpacesListings />
			</div>
		</div>
	);
};

export default page;
