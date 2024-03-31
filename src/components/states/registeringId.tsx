import { Button } from "@/components/ui/button";
import { useSimpl3Auth } from "@/simpl3Auth";
import React from "react";

export function RegisteringId() {
    const { AuthContext } = useSimpl3Auth({ appId: "simpl3" });
    const { send } = React.useContext(AuthContext);

    return (
        <div className="flex flex-col gap-16">
            <div className="text-center space-y-1">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight">
                    Hey there!
                </h3>
                <p className="text-sm text-muted-foreground">
                    Seems like you&apos;re new here 👀
                </p>
            </div>
            <div className="flex flex-col gap-1">
                <Button
                    variant="default"
                    size="lg"
                    onClick={() => {
                        send({ type: "confirm" });
                    }}
                >
                    Register new account
                </Button>
                <Button
                    variant="link"
                    className="text-xs"
                    onClick={() => {
                        send({ type: "reject" });
                    }}
                >
                    Try with a different email
                </Button>
            </div>
        </div>
    );
}
