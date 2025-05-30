import { AppNavbar } from "../(user)/components/AppNavbar";
import { Footer } from "./components/Footer";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<AppNavbar />
			<div className="py-20">{children}</div>
			<Footer />
		</div>
	);
}
