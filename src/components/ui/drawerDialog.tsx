import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";

export function DrawerDialog({
    open = false,
    children,
    onClose,
    forceDialog = false,
    className
}: {
    open: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    forceDialog?: boolean;
    className?: string;
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    let content = (
        <Drawer open={open} dismissible={false}>
            <DrawerContent>
                <div className="s3-mt-8 s3-px-6 s3-flex s3-flex-col s3-items-center s3-justify-center">
                    {children}
                </div>
                <DrawerFooter className="s3-py-6 s3-text-center s3-text-xs s3-text-muted-foreground">
                    powered by Simpl3
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );

    if (forceDialog || isDesktop) {
        content = (
            <Dialog
                open={open}
                onOpenChange={(open) => !open && onClose && onClose()}

            >
                <DialogContent className="s3-p-6 s3-rounded-lg sm:s3-max-w-[425px]">
                    {children}
                    <DialogFooter className="s3-pt-6 s3-text-center s3-text-xs s3-text-slate-300 sm:s3-justify-center">
                        powered by simpl3
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div className={className}>
            {content}
        </div>
    );
}
