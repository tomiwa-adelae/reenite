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
		<Dialog
			open={open}
			onOpenChange={() => {
				if (!open) {
					closeModal;
				} else {
					closeModal;
				}
			}}
		>
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
