import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "s3-fixed s3-inset-0 s3-z-50 s3-bg-black/80  data-[state=open]:s3-animate-in data-[state=closed]:s3-animate-out data-[state=closed]:s3-fade-out-0 data-[state=open]:s3-fade-in-0",
            className,
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "s3-fixed s3-inset-x-0 s3-mx-auto s3-top-[5%] s3-z-50 s3-grid s3-w-full s3-max-w-[95%] s3-gap-4 s3-border s3-bg-background s3-p-6 s3-shadow-lg s3-duration-200 data-[state=open]:s3-animate-in data-[state=closed]:s3-animate-out data-[state=closed]:s3-fade-out-0 data-[state=open]:s3-fade-in-0 data-[state=closed]:s3-zoom-out-95 data-[state=open]:s3-zoom-in-95  data-[state=closed]:s3-slide-out-to-top-[10%] data-[state=open]:s3-slide-in-from-top-[10%] sm:s3-rounded-lg",
                className,
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="s3-absolute s3-right-4 s3-top-4 s3-rounded-sm s3-opacity-70 s3-ring-offset-background s3-transition-opacity hover:s3-opacity-100 focus:s3-outline-none focus:s3-ring-2 focus:s3-ring-ring focus:s3-ring-offset-2 disabled:s3-pointer-events-none data-[state=open]:s3-bg-accent data-[state=open]:s3-text-muted-foreground">
                <Cross2Icon className="s3-h-4 s3-w-4" />
                <span className="s3-sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "s3-flex s3-flex-col s3-space-y-1.5 s3-text-center sm:s3-text-left",
            className,
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "s3-flex s3-flex-col-reverse sm:s3-flex-row sm:s3-justify-end sm:s3-space-x-2",
            className,
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "s3-text-lg s3-font-semibold s3-leading-none s3-tracking-tight",
            className,
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("s3-text-sm s3-text-muted-foreground", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
