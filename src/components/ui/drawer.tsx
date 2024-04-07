import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
    shouldScaleBackground = true,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
    />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        ref={ref}
        className={cn("s3-fixed s3-inset-0 s3-z-50 s3-bg-black/80", className)}
        {...props}
    />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            className={cn(
                "s3-fixed s3-inset-x-0 s3-bottom-0 s3-z-50 s3-mt-24 s3-flex s3-h-auto s3-flex-col s3-rounded-t-[10px] s3-border s3-bg-background",
                className,
            )}
            {...props}
        >
            <div className="s3-mx-auto s3-mt-4 s3-h-2 s3-w-[100px] s3-rounded-full s3-bg-muted" />
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("s3-grid s3-gap-1.5 s3-p-4 s3-text-center sm:s3-text-left", className)}
        {...props}
    />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("s3-mt-auto s3-flex s3-flex-col s3-gap-2 s3-p-4", className)}
        {...props}
    />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={cn(
            "s3-text-lg s3-font-semibold s3-leading-none s3-tracking-tight",
            className,
        )}
        {...props}
    />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn("s3-text-sm s3-text-muted-foreground", className)}
        {...props}
    />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
