import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Head from "next/head";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { REENITE_WEBSITE_URL } from "@/constants";
import "leaflet/dist/leaflet.css";

const dmsans = DM_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Book a space at Reenite - Coworking space in Uyo",
	description:
		"Hey friends, A space where skills are honed, ideas are born, and careers thrive. Join us at Reenite and be part of a community driving innovation in Uyo and beyond. Learn more See our services What we do Our mission is to bridge the gap between talent and opportunity, creating a space where skills are",
	openGraph: {
		images: "/assets/images/opengraph.png",
	},
	metadataBase: new URL(REENITE_WEBSITE_URL),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<Head>
				<meta property="og:image" content="/opengraph.png" />
				<meta
					property="og:image"
					content="/assets/images/opengraph.png"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, user-scalable=no"
				/>
				<meta
					data-n-head="ssr"
					data-hid="viewport"
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
				/>
			</Head>
			<html lang="en">
				<body className={`${dmsans.className} antialiased`}>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
