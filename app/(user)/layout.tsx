import { redirect } from "next/navigation";
import { AppNavbar } from "./components/AppNavbar";
import { Sidebar } from "./components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/customer/user.actions";

import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "User - Reenite",
	description:
		"Browse our wide collection of workspaces for ease and comfort. Quality guaranteed.",
	keywords: "Reenite, spaces, space, our spaces, all spaces",
};

export default async function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	if (!user?.user) return redirect("/sign-in");
	return (
		<div>
			<AppNavbar user={user?.user} />
			<div className="pt-20 flex items-center justify-start">
				<Sidebar user={user?.user} />
				<div className="flex-1 py-8 lg:ml-96">{children}</div>
			</div>
		</div>
	);
}
