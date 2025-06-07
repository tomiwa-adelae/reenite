import { currentUser } from "@clerk/nextjs/server";
import { AppNavbar } from "../(user)/components/AppNavbar";
import { Footer } from "./components/Footer";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { redirect } from "next/navigation";

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
			<div className="py-20">{children}</div>
			<Footer />
		</div>
	);
}
