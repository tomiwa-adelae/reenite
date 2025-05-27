import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { MobileNavbar } from "@/components/shared/MobileNavbar";

export const Header = () => {
	return (
		<header className="z-50 bg-white dark:bg-black py-4 h-20 flex items-center justify-center fixed top-0 w-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
			<div className="container flex items-center justify-between gap-4">
				<Link href="/" className="group">
					<Image
						src={"/assets/images/logo-full.svg"}
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
				<nav className="hidden flex-1 lg:flex uppercase items-center justify-center gap-2 lg:gap-8">
					{navLinks.map((link, idx) => (
						<Link
							key={idx}
							href={link.slug}
							className="text-sm font-medium hover:text-secondary transition-all"
						>
							{link.label}
						</Link>
					))}
				</nav>
				<div className="flex items-center justify-end gap-4">
					<div className="hidden md:block">
						<Button variant="secondary" asChild size="md">
							<Link href="/book">Book a space</Link>
						</Button>
					</div>
					<div className="lg:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</header>
	);
};
