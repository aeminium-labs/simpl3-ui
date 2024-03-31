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
    const { AuthContext } = useSimpl3Auth({
        appId: "simpl3",
    });
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
        <div className="flex flex-col gap-6 w-full">
            <div className="text-center space-y-1">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                    Register this device
                </h3>
                <p className="text-sm text-muted-foreground">
                    Please enter the code sent to <strong>{email}</strong>
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full"
                >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
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
                                                className="justify-center"
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
                                                                            className="w-10 h-10 text-xl"
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
                                                                            className="w-10 h-10 text-xl"
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
