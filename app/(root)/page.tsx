import { Showcase } from "@/components/shared/Showcase";
import { OurServices } from "@/components/OurServices";
import { ExploreSpaces } from "@/components/ExploreSpaces";
import { Marquee } from "@/components/Marquee";
import { Addons } from "@/components/Addons";
import { RandomText } from "@/components/RandomText";
import { Testimonials } from "@/components/Testimonials";
import { ImageLibrary } from "@/components/shared/ImageLibrary";
import { firstMarquee, secondMarquee } from "@/constants";

const page = () => {
	return (
		<div>
			<Showcase />
			<Marquee texts={firstMarquee} />
			<OurServices />
			<ExploreSpaces />
			<Addons />
			<RandomText />
			<Marquee texts={secondMarquee} />
			<Testimonials />
			<ImageLibrary />
		</div>
	);
};

export default page;
