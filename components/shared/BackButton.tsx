import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const BackButton = ({ slug }: { slug: string }) => {
	return (
		<Button
			size="icon"
			className="size-10 lg:size-12 bg-[#F7F7F7]"
			variant="ghost"
			asChild
		>
			<Link href={slug}>
				<ArrowLeft className="size-4 lg:size-6" />
			</Link>
		</Button>
	);
};
