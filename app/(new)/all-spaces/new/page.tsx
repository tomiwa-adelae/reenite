import { Button } from "@/components/ui/button";
import { Footer } from "@/app/(new)/components/Footer";
import Link from "next/link";
import { Overview } from "../../components/Overview";

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
