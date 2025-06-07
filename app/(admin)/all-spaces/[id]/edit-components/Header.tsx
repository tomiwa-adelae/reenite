interface Props {
	children?: React.ReactNode;
	title: string;
}

export const Header = ({ title, children }: Props) => {
	return (
		<div className="flex items-center justify-between gap-4 container">
			<h2 className="font-semibold text-muted-foreground text-xl md:text-2xl lg:text-3xl">
				{title}
			</h2>
			{children}
		</div>
	);
};
