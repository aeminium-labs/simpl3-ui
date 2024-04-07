import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSimpl3Auth } from "@/simpl3Auth";
import React from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
    pin: z.string().length(6, "Please enter a 6 digits pin code"),
});

export function RegisteringPin() {
    const { AuthContext } = useSimpl3Auth();
    const { send } = React.useContext(AuthContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        send({
            type: "enterPin",
            value: values.pin,
        });
    }

    return (
        <div className="s3-flex s3-flex-col s3-gap-6 s3-w-full">
            <div className="s3-text-center s3-space-y-1">
                <h3 className="s3-scroll-m-20 s3-text-xl s3-font-bold s3-tracking-tight">
                    Secure your account
                </h3>
                <p className="s3-text-sm s3-text-muted-foreground">
                    Please enter a pin code for this account
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="s3-flex s3-flex-col s3-gap-6 s3-w-full"
                >
                    <div className="s3-grid s3-w-full s3-items-center s3-gap-4">
                        <div className="s3-flex s3-flex-col s3-space-y-1.5">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={6}
                                                onComplete={form.handleSubmit(
                                                    onSubmit,
                                                )}
                                                inputMode="numeric"
                                                className="s3-justify-center"
                                                pushPasswordManagerStrategy="none"
                                                autoFocus={true}
                                                render={({ slots }) => (
                                                    <InputOTPGroup>
                                                        {slots.map(
                                                            (slot, index) => (
                                                                <InputOTPSlot
                                                                    key={index}
                                                                    className="s3-w-10 s3-h-10 s3-text-xl"
                                                                    {...slot}
                                                                    char={
                                                                        slot.char
                                                                            ? "•"
                                                                            : slot.char
                                                                    }
                                                                    hasFakeCaret={
                                                                        false
                                                                    }
                                                                />
                                                            ),
                                                        )}{" "}
                                                    </InputOTPGroup>
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
