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

export function WaitingPin() {
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
        <div className="flex flex-col gap-6 w-full">
            <div className="text-center space-y-1">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                    Unlock your account
                </h3>
                <p className="text-sm text-muted-foreground">
                    Please your pin code to unlock
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
                                                className="justify-center"
                                                pushPasswordManagerStrategy="none"
                                                autoFocus={true}
                                                render={({ slots }) => (
                                                    <InputOTPGroup>
                                                        {slots.map(
                                                            (slot, index) => (
                                                                <InputOTPSlot
                                                                    key={index}
                                                                    className="w-10 h-10 text-2xl"
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
