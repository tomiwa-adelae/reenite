import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
	console.log(error);
};

// await User.updateMany(
// 	{ isAdmin: { $exists: false } },
// 	{ $set: { isAdmin: false } }
// );

export const formatMoneyInput = (inputValue: any) => {
	if (inputValue == null || isNaN(Number(inputValue))) return "0";

	let value = String(inputValue).replace(/[^0-9.]/g, "");
	let [whole, decimal] = value.split(".");
	whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimal !== undefined ? `${whole}.${decimal}` : whole;
};

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
	if (
		event.key === "e" ||
		event.key === "E" ||
		event.key === "-" ||
		event.key === "+"
	) {
		event.preventDefault();
	}
};

export function removeCommas(value: any) {
	return value.replace(/,/g, "");
}

export function formatDate(dateString: string | any): string {
	const date = new Date(dateString);

	// Get the day, month and year
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	// Function to get the ordinal suffix
	const getOrdinalSuffix = (num: number): string => {
		const suffixes = ["th", "st", "nd", "rd"];
		const modulo100 = num % 100;
		const modulo10 = num % 10;
		const suffix =
			modulo10 <= 3 && modulo10 > 0 && modulo100 !== 11
				? suffixes[modulo10]
				: suffixes[0];
		return `${num}${suffix}`;
	};

	// Format the date
	return `${month} ${getOrdinalSuffix(day)}, ${year}`;
}
