import { Button } from "@/components/ui/button";
import { Footer } from "@/app/(new)/components/Footer";
import Link from "next/link";
import { Overview } from "../../components/Overview";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Create a space - Admin - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

const page = () => {
	return (
		<div>
			<Overview />
			<Footer>
				<div className="container flex items-center justify-end gap-4">
					<Button asChild size="lg">
						<Link href="/all-spaces/new/structure">
							Get started
						</Link>
					</Button>
				</div>
			</Footer>
		</div>
	);
};

export default page;
