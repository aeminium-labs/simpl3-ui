import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "s3-flex s3-h-9 s3-w-full s3-rounded-md s3-border s3-border-input s3-bg-transparent s3-px-3 s3-py-1 s3-text-sm s3-shadow-sm s3-transition-colors file:s3-border-0 file:s3-bg-transparent file:s3-text-sm file:s3-font-medium placeholder:s3-text-muted-foreground focus-visible:s3-outline-none focus-visible:s3-ring-1 focus-visible:s3-ring-ring disabled:s3-cursor-not-allowed disabled:s3-opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = "Input";

export { Input };
