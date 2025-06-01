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

				{/* <NoSpaces /> */}
				<div className="mt-4">
					<SpacesListings />
				</div>
			</div>
		</div>
	);
};

export default page;
