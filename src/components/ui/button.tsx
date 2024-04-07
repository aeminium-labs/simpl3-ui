import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "s3-inline-flex s3-items-center s3-justify-center s3-whitespace-nowrap s3-rounded-md s3-text-sm s3-font-medium s3-transition-colors focus-visible:s3-outline-none focus-visible:s3-ring-1 focus-visible:s3-ring-ring disabled:s3-pointer-events-none disabled:s3-opacity-50",
    {
        variants: {
            variant: {
                default:
                    "s3-bg-primary s3-text-primary-foreground s3-shadow hover:s3-bg-primary/90",
                destructive:
                    "s3-bg-destructive s3-text-destructive-foreground s3-shadow-sm hover:s3-bg-destructive/90",
                outline:
                    "s3-border s3-border-input s3-bg-background s3-shadow-sm hover:s3-bg-accent hover:s3-text-accent-foreground",
                secondary:
                    "s3-bg-secondary s3-text-secondary-foreground s3-shadow-sm hover:s3-bg-secondary/80",
                ghost: "hover:s3-bg-accent hover:s3-text-accent-foreground",
                link: "s3-text-primary s3-underline-offset-4 hover:s3-underline",
            },
            size: {
                default: "s3-h-9 s3-px-4 s3-py-2",
                sm: "s3-h-8 s3-rounded-md s3-px-3 s3-text-xs",
                lg: "s3-h-10 s3-rounded-md s3-px-8",
                icon: "s3-h-9 s3-w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
