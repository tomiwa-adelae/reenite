// import {
// 	Drawer,
// 	DrawerClose,
// 	DrawerContent,
// 	DrawerDescription,
// 	DrawerFooter,
// 	DrawerHeader,
// 	DrawerTitle,
// 	DrawerTrigger,
// } from "@/components/ui/drawer";
// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";
// import { ScrollArea } from "../ui/scroll-area";

// interface Props {
// 	open: boolean;
// 	closeModal?: () => void;
// 	children: React.ReactNode;
// }

// export const ResponsiveModal = ({ open, children, closeModal }: Props) => {
// 	return (
// 		<div className="relative">
// 			<div className="md:hidden">
// 				<Drawer open={open} onOpenChange={closeModal}>
// 					<DrawerContent className="md:hidden h-[550px]">
// 						<ScrollArea className="h-[550px]">
// 							{children}
// 						</ScrollArea>
// 					</DrawerContent>
// 				</Drawer>
// 			</div>
// 			<div className="hidden md:block">
// 				<Dialog open={open} onOpenChange={closeModal}>
// 					<form>
// 						<DialogContent className="sm:max-w-xl max-h-[550px] overflow-hidden hidden md:block">
// 							<ScrollArea className="max-h-[550px]">
// 								{children}
// 							</ScrollArea>
// 						</DialogContent>
// 					</form>
// 				</Dialog>
// 			</div>
// 		</div>
// 	);
// };

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Props {
	open: boolean;
	closeModal?: () => void;
	children: React.ReactNode;
}

export const ResponsiveModal = ({ open, children, closeModal }: Props) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (!open) return null;

	return isDesktop ? (
		<Dialog open={open} onOpenChange={closeModal}>
			<form>
				<DialogContent className="sm:max-w-xl max-h-[550px] overflow-hidden">
					<ScrollArea className="max-h-[550px]">
						{children}
					</ScrollArea>
				</DialogContent>
			</form>
		</Dialog>
	) : (
		<Drawer open={open} onOpenChange={closeModal}>
			<DrawerContent className="h-[85vh]">
				<ScrollArea className="h-[85vh]">{children}</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};
