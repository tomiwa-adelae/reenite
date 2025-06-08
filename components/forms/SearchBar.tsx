"use client";
import { CircleX, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export function SearchBar({
	placeholder,
	onClose,
}: {
	placeholder: string;
	onClose: () => void;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [query, setQuery] = useState("");

	useEffect(() => {
		const urlQuery = searchParams.get("query") || "";
		setQuery(urlQuery);
	}, [searchParams]);

	// Debounced update to URL when query changes
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			if (query) {
				params.set("query", query);
			} else {
				params.delete("query");
			}

			// Build a clean URL with pathname + query string
			const newUrl = `${pathname}?${params.toString()}`;
			router.push(newUrl, { scroll: false });
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [query]);

	return (
		<div className="relative w-full mt-4">
			<Search className="absolute top-[50%] left-3 translate-y-[-50%] text-muted-foreground size-5" />
			<Input
				className="pl-8 rounded-full dark:border-white border-2"
				placeholder={placeholder}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button
				size="icon"
				className="bg-[#F7F7F7] absolute top-[50%] right-2 translate-y-[-50%]"
				variant="ghost"
				onClick={() => {
					const params = new URLSearchParams(searchParams.toString());
					params.delete("query");
					// Build a clean URL with pathname + query string
					const newUrl = `${pathname}?${params.toString()}`;
					router.push(newUrl, { scroll: false });
					onClose();
				}}
			>
				<CircleX className="text-muted-foreground size-5" />
			</Button>
		</div>
	);
}
