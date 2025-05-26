export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div><Header />{children}</div>;
}
