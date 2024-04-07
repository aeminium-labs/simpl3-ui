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
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
    otp: z.string().length(8, "Please enter all the 8 digits"),
});

export function WaitingOTP({ email }: { email?: string }) {
    const { AuthContext } = useSimpl3Auth();
    const { send } = React.useContext(AuthContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        send({
            type: "enterOTP",
            value: values.otp,
        });
    }

    return (
        <div className="s3-flex s3-flex-col s3-gap-6 s3-w-full">
            <div className="s3-text-center s3-space-y-1">
                <h3 className="s3-scroll-m-20 s3-text-xl s3-font-bold s3-tracking-tight">
                    Register this device
                </h3>
                <p className="s3-text-sm s3-text-muted-foreground">
                    Please enter the code sent to <strong>{email}</strong>
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
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={8}
                                                onComplete={form.handleSubmit(
                                                    onSubmit,
                                                )}
                                                inputMode="numeric"
                                                className="s3-justify-center"
                                                autoFocus={true}
                                                render={({ slots }) => (
                                                    <>
                                                        <InputOTPGroup>
                                                            {slots
                                                                .slice(0, 4)
                                                                .map(
                                                                    (
                                                                        slot,
                                                                        index,
                                                                    ) => (
                                                                        <InputOTPSlot
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="s3-w-10 s3-h-10 s3-text-xl"
                                                                            {...slot}
                                                                            hasFakeCaret={
                                                                                false
                                                                            }
                                                                        />
                                                                    ),
                                                                )}{" "}
                                                        </InputOTPGroup>
                                                        <InputOTPSeparator />
                                                        <InputOTPGroup>
                                                            {slots
                                                                .slice(4)
                                                                .map(
                                                                    (
                                                                        slot,
                                                                        index,
                                                                    ) => (
                                                                        <InputOTPSlot
                                                                            key={
                                                                                index +
                                                                                4
                                                                            }
                                                                            className="s3-w-10 s3-h-10 s3-text-xl"
                                                                            {...slot}
                                                                            hasFakeCaret={
                                                                                false
                                                                            }
                                                                        />
                                                                    ),
                                                                )}
                                                        </InputOTPGroup>
                                                    </>
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
