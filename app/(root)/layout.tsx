import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getUserInfo } from "@/lib/actions/customer/user.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const clerkUser = await currentUser();
	const user = await getUserInfo(clerkUser?.id!);

	return (
		<div>
			<Header user={user?.user} />
			<div className="pt-20">{children}</div>
			<Footer />
		</div>
	);
}
