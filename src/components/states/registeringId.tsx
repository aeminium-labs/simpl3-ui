import { Button } from "@/components/ui/button";
import { useSimpl3Auth } from "@/simpl3Auth";
import React from "react";

export function RegisteringId() {
    const { AuthContext } = useSimpl3Auth();
    const { send } = React.useContext(AuthContext);

    return (
        <div className="s3-flex s3-flex-col s3-gap-16">
            <div className="s3-text-center s3-space-y-1">
                <h3 className="s3-scroll-m-20 s3-text-xl s3-font-bold s3-tracking-tight">
                    Hey there!
                </h3>
                <p className="s3-text-sm s3-text-muted-foreground">
                    Seems like you&apos;re new here 👀
                </p>
            </div>
            <div className="s3-flex s3-flex-col s3-gap-1">
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
                    className="s3-text-xs"
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
