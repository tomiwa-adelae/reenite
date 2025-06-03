import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
	open: boolean;
	children: React.ReactNode;
}

export const ResponsiveModal = ({ open, children }: Props) => {
	return (
		<div className="relative">
			<div className="hidden md:block">
				<Dialog open={open}>
					<form>
						{/* <DialogTrigger asChild>
							<Button variant="outline">Open Dialog</Button>
						</DialogTrigger> */}
						<DialogContent className="sm:max-w-xl h-[550px] overflow-hidden">
							<ScrollArea className="h-[550px]">
								{children}
							</ScrollArea>
						</DialogContent>
					</form>
				</Dialog>
			</div>
			<div className="md:hidden">
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant="outline">Open Drawer</Button>
					</DrawerTrigger>
					<DrawerContent>
						<ScrollArea>{children}</ScrollArea>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	);
};
