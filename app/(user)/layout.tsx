import { AppNavbar } from "./components/AppNavbar";
import { Sidebar } from "./components/Sidebar";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<AppNavbar />
			<div className="pt-20 flex items-center justify-start">
				<Sidebar />
				<div className="flex-1 py-8 lg:ml-96">{children}</div>
			</div>
		</div>
	);
}
