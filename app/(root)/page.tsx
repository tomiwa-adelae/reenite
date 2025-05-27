import { Showcase } from "@/components/shared/Showcase";
import { OurServices } from "@/components/OurServices";
import { ExploreSpaces } from "@/components/ExploreSpaces";
import { Marquee } from "@/components/Marquee";
import { Addons } from "@/components/Addons";
import { RandomText } from "@/components/RandomText";
import { Testimonials } from "@/components/Testimonials";
import { ImageLibrary } from "@/components/shared/ImageLibrary";
import { galleryImages } from "@/constants";

const page = () => {
	return (
		<div>
			<Showcase />
			<Marquee />
			<OurServices />
			<ExploreSpaces />
			<Addons />
			<RandomText />
			<Testimonials />
			<ImageLibrary />
		</div>
	);
};

export default page;
