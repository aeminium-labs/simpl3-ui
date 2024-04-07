import * as React from "react";
import { DashIcon } from "@radix-ui/react-icons";
import { OTPInput, SlotProps } from "input-otp";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn("s3-flex s3-items-center s3-gap-2", className)}
        {...props}
    />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("s3-flex s3-items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">,
    SlotProps & React.ComponentPropsWithoutRef<"div">
>(({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "s3-relative s3-flex s3-h-9 s3-w-9 s3-items-center s3-justify-center s3-border-y s3-border-r s3-border-input s3-text-sm s3-shadow-sm s3-transition-all first:s3-rounded-l-md first:s3-border-l last:s3-rounded-r-md",
                isActive && "s3-z-10 s3-ring-1 s3-ring-ring",
                className,
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="s3-pointer-events-none s3-absolute s3-inset-0 s3-flex s3-items-center s3-justify-center">
                    <div className="s3-animate-caret-blink s3-h-4 s3-w-px s3-bg-foreground s3-duration-1000" />
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <DashIcon />
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
