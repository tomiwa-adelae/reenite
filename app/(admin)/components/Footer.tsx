import React from "react";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="py-4 border-t h-16 flex items-center justify-start">
			<p className="container text-base text-muted-foreground">
				&copy; {year} Reenite. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
