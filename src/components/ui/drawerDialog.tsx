import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";

export function DrawerDialog({
    open = false,
    children,
    onClose,
    forceDialog = false,
}: {
    open: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    forceDialog?: boolean;
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (forceDialog || isDesktop) {
        return (
            <Dialog
                open={open}
                onOpenChange={(open) => !open && onClose && onClose()}
            >
                <DialogContent className="p-6 rounded-lg">
                    {children}
                    <DialogFooter className="pt-6 text-center text-xs text-slate-300 sm:justify-center font-semibold ">
                        powered by simpl3
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} dismissible={false}>
            <DrawerContent>
                <div className="mt-8 px-6 flex flex-colitems-center justify-center">
                    {children}
                </div>
                <DrawerFooter className="py-6 text-center text-xs text-muted-foreground">
                    powered by Simpl3
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
