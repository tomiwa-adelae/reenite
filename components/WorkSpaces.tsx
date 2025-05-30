import Image from "next/image";
import { Button } from "./ui/button";

type ButtonVariant =
	| "default"
	| "secondary"
	| "link"
	| "black"
	| "white"
	| "destructive"
	| "outline"
	| "ghost";

type Workspace = {
	title: string;
	description: string;
	amenities: string;
	image: string;
	bg: string;
	buttonVariant: ButtonVariant;
};

const workspaces: Workspace[] = [
	{
		title: "Mini Conference Room",
		description: "A distraction-free personal desk perfect for deep work.",
		amenities: "Wifi, Parking, Coffee, TV Screen, Privacy, AC",
		image: "/assets/images/space-one.jpg",
		bg: "bg-primary",
		buttonVariant: "secondary",
	},
	{
		title: "Executive Office Suite",
		description: "Ideal for focused tasks or one-on-one meetings.",
		amenities: "Wifi, Coffee, Whiteboard, Ergonomic Chair, AC",
		image: "/assets/images/space-two.jpg",
		bg: "bg-secondary",
		buttonVariant: "default",
	},
	{
		title: "Mini Conference Room",
		description: "A distraction-free personal desk perfect for deep work.",
		amenities: "Wifi, Parking, Coffee, TV Screen, Privacy, AC",
		image: "/assets/images/space-one.jpg",
		bg: "bg-primary",
		buttonVariant: "secondary",
	},
	{
		title: "Executive Office Suite",
		description: "Ideal for focused tasks or one-on-one meetings.",
		amenities: "Wifi, Coffee, Whiteboard, Ergonomic Chair, AC",
		image: "/assets/images/space-two.jpg",
		bg: "bg-secondary",
		buttonVariant: "default",
	},
	// Add more items here as needed
];

export const WorkSpaces = () => {
	return (
		<section className="bg-white pt-16">
			<div className="container">
				<h2 className="font-medium text-2xl md:text-3xl lg:text-4xl text-center">
					Redefining the Future{" "}
					<span className="text-muted-foreground">of Workspaces</span>
				</h2>
			</div>

			<div className="mt-8">
				{workspaces.map((space, index) => (
					<div
						key={index}
						className="grid grid-cols-1 md:grid-cols-2"
					>
						<div
							className={`${
								space.bg
							} py-16 text-white flex items-start justify-center ${
								index % 2 === 1
									? "order-1 md:order-2"
									: "order-1"
							}`}
						>
							<div className="container h-full flex flex-col items-start justify-center">
								<h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">
									{space.title}
								</h2>
								<p className="text-sm lg:text-base mt-3">
									{space.description}
								</p>
								<p className="text-sm lg:text-base mt-2 mb-6">
									Amenities: {space.amenities}
								</p>
								<Button size="lg" variant={space.buttonVariant}>
									Book Now
								</Button>
							</div>
						</div>
						<Image
							src={space.image}
							alt={space.title}
							width={1000}
							height={1000}
							className={`aspect-square object-cover ${
								index % 2 === 1
									? "order-2 md:order-1"
									: "order-2"
							}`}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
