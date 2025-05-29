import { SpacesShowcase } from "@/components/spaces/SpacesShowcase";
import { FAQs } from "@/components/shared/FAQs";
import { SpaceDetails } from "@/components/spaces/SpaceDetails";

const page = () => {
	const images = [
		{ src: "/assets/images/space-one.jpg" },
		{ src: "/assets/images/space-two.jpg" },
		{ src: "/assets/images/space-three.jpg" },
		{ src: "/assets/images/space-four.jpg" },
		{ src: "/assets/images/space-five.jpg" },
		{ src: "/assets/images/space-five.jpg" },
	];
	return (
		<div className="relative">
			{/* <SpacesShowcase images={images} title={"Mini Conference Room"} /> */}
			<SpaceDetails images={images} />
			{/* <FAQs /> */}
		</div>
	);
};

export default page;
