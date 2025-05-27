import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<div className="pt-20">{children}</div>
			<Footer />
		</div>
	);
}
