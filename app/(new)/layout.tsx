import { AppNavbar } from "./components/AppNavbar";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<AppNavbar />
			<div className="py-20">{children}</div>
		</div>
	);
}
