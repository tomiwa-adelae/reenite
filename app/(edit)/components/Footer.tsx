import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
	return (
		<footer className="border-t fixed w-full bottom-0 py-4 h-20 flex items-center justify-center z-40 bg-white">
			<div className="container flex items-center justify-end gap-4">
				<Button asChild size="lg">
					<Link href="/about">Done</Link>
				</Button>
			</div>
		</footer>
	);
};
