interface Props {
	icon: any;
	placeHolder: string;
}

export const AboutBox = ({ icon, placeHolder }: Props) => {
	const Icon = icon;
	return (
		<div className="flex items-center justify-start gap-4 border-b py-6 hover:rounded-2xl hover:bg-muted px-4 cursor-pointer transition-all text-muted-foreground">
			<Icon className="size-6 lg:size-7" />{" "}
			<p className="text-sm lg:text-base">{placeHolder}</p>
		</div>
	);
};
