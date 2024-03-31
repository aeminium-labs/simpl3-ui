import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSimpl3Auth } from "@/simpl3Auth";
import React from "react";

const formSchema = z.object({
    email: z.string().email(),
});

export function Idle() {
    const { AuthContext } = useSimpl3Auth({ appId: "simpl3" });
    const { send } = React.useContext(AuthContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        send({
            type: "enterId",
            value: values.email,
        });
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="text-center space-y-1">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                    Sign-in to your account
                </h3>
                <p className="text-sm text-muted-foreground">
                    Please enter your email address
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@madesimpl3.com"
                                                autoComplete="off"
                                                className="h-12 text-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
}
