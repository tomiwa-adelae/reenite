import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Create my account - Reenite",
};

export default function page() {
	return (
		<div className="w-full py-16 md:pt-0 md:pb-8">
			<div className="border-b py-4 text-center hidden md:block">
				<p className="font-semibold text-lg">Sign up</p>
			</div>
			<div className="px-[32px] mt-12 hidden md:block">
				<h2 className="text-2xl md:text-3xl font-semibold leading-0">
					Create an with reenite
				</h2>
			</div>
			<div className="md:hidden">
				<h2 className="text-2xl md:text-3xl font-semibold leading-0">
					Sign up to reenite
				</h2>
			</div>
			<div className="mt-1">
				<SignUp />
			</div>
			<p className="text-sm text-center text-muted-foreground mt-4">
				Already have an account?{" "}
				<Link
					className="text-black hover:text-secondary transition-all"
					href="/sign-in"
				>
					Log in
				</Link>
			</p>
		</div>
	);
}
