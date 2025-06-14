// // import { Showcase } from "@/components/shared/Showcase";
// // import { OurServices } from "@/components/OurServices";
// // import { ExploreSpaces } from "@/components/ExploreSpaces";
// // import { Marquee } from "@/components/Marquee";
// // import { Addons } from "@/components/Addons";
// // import { RandomText } from "@/components/RandomText";
// // import { Testimonials } from "@/components/Testimonials";
// // import { ImageLibrary } from "@/components/shared/ImageLibrary";
// // import { firstMarquee, secondMarquee } from "@/constants";
// // import { getSpaces } from "@/lib/actions/customer/space.actions";

// const page = async () => {
// 	// const spaces = await getSpaces();
// 	redirect('https://reenite.com')
// 	return (
// 		<div>
// 			{/* <Showcase />
// 			<Marquee texts={firstMarquee} />
// 			<OurServices />
// 			<ExploreSpaces spaces={spaces?.spaces} />
// 			<Addons />
// 			<RandomText />
// 			<Marquee texts={secondMarquee} />
// 			<Testimonials />
// 			<ImageLibrary /> */}
// 		</div>
// 	);
// };

// export default page;

import { redirect } from "next/navigation";

const page = async () => {
	redirect("https://reenite.com/");
};

export default page;
