import { AppNavbar } from "./components/AppNavbar";
import Footer from "./components/Footer";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<AppNavbar />
			<div className="pt-20 min-h-[90vh]">{children}</div>
			{/* <Footer /> */}
		</div>
	);
}
