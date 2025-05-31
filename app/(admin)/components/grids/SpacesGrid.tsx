import Image from "next/image";

export const SpacesGrid = () => {
	return (
		<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
		</div>
	);
};
