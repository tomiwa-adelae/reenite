import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<>
			<Header />
			<div className="py-16 min-h-[80vh] flex flex-col items-center justify-center space-y-4">
				<h1 className="font-bold text-7xl md:text-8xl lg:text-9xl text-primary">
					404
				</h1>
				<p className="text-base">Page not found.</p>
				<Button asChild size="lg" variant="secondary">
					<Link href="/spaces">Go back home</Link>
				</Button>
			</div>
			<Footer />
		</>
	);
};

export default page;
