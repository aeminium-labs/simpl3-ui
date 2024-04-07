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
    const { AuthContext } = useSimpl3Auth();
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
        <div className="s3-flex s3-flex-col s3-gap-6 s3-w-full">
            <div className="s3-text-center s3-space-y-1">
                <h3 className="s3-scroll-m-20 s3-text-xl s3-font-bold s3-tracking-tight">
                    Sign-in to your account
                </h3>
                <p className="s3-text-sm s3-text-muted-foreground">
                    Please enter your email address
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@madesimpl3.com"
                                                autoComplete="off"
                                                className="s3-h-12 s3-text-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="s3-w-full" size="lg">
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
}
