import { Showcase } from "@/components/shared/Showcase";
import { OurServices } from "@/components/OurServices";
import { ExploreSpaces } from "@/components/ExploreSpaces";
import { Marquee } from "@/components/Marquee";
import { Addons } from "@/components/Addons";
import { RandomText } from "@/components/RandomText";
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
			<ImageLibrary />
		</div>
	);
};

export default page;
