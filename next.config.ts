import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "previews.123rf.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "icon-library.com",
				port: "",
			},
		],
	},
};

export default nextConfig;
