import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { footerDetails, socialLinks } from "@/constants";

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-[#1B1D37] text-white dark:bg-black dark:text-white">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-16">
					<div className="col-span-2 md:col-span-1 lg:col-span-2">
						<Link href="/" className="group">
							<Image
								src={"/assets/images/logo-full-white.svg"}
								alt="Reenite full logo in it's blue color"
								width={1000}
								height={1000}
								className="group-hover:hidden w-[150px] md:w-[160px] lg:w-[180px]"
							/>
							<Image
								src={"/assets/images/logo-full-grey.svg"}
								alt="Reenite full logo in it's grey color"
								width={1000}
								height={1000}
								className="hidden group-hover:block w-[150px] md:w-[160px] lg:w-[180px]"
							/>
						</Link>
						<p className="text-white/80 dark:text-gray-200 text-base mt-4">
							Connecting people with the perfect workspace for
							productivity and collaboration.
						</p>
						<div className="flex items-center text-primary justify-start gap-6 mt-8">
							{socialLinks.map(({ icon, name, slug }, index) => {
								const Icon = icon;
								return (
									<Button
										size="icon"
										asChild
										variant="outline"
										key={index}
									>
										<a
											href={slug}
											target="_blank"
											// className="flex items-center justify-start gap-4 group hover:text-secondary transition-all"
										>
											<Icon className="hover:text-secondary transition-all" />
										</a>
									</Button>
								);
							})}
						</div>
					</div>
					{footerDetails.map(({ title, links }, index) => (
						<div key={index} className="">
							<h3 className="text-sm md:text-base font-semibold tracking-wider uppercase">
								{title}
							</h3>
							<ul className="mt-4 space-y-4">
								{links.map(({ slug, label }, idx) => (
									<li key={idx}>
										<Link
											className="text-xs uppercase hover:text-secondary transition-all text-white/80"
											href={slug}
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<div className="container">
				<Separator className="text-red-400" />
			</div>
			<div className="transition-all py-8 text-center font-medium uppercase text-xs">
				<p className="container">
					&copy; {year} Reenite. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
