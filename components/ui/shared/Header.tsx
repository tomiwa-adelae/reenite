export const Header = () => {
	return (
		<header>
			<div className="container">
				<Link href="/">
					<Image
						src={"/assets/images/full-logo.svg"}
						alt="Reenite full logo in it's blue color"
						width={1000}
						height={1000}
						className="w-[20px]"
					/>
				</Link>
			</div>
		</header>
	);
};
