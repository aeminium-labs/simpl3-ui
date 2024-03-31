import { authMachine } from "@/authMachine";
import { shallowEqual, useActorRef, useSelector } from "@xstate/react";
import React from "react";
import { Idle } from "@/components/states/idle";
import { RegisteringId } from "@/components/states/registeringId";
import { WaitingOTP } from "@/components/states/waitingOTP";
import { RegisteringPin } from "@/components/states/registeringPin";
import { ConfirmingPin } from "@/components/states/confirmingPin";
import { WaitingPin } from "@/components/states/waitingPin";
import { Loading } from "@/components/states/loading";
import { DrawerDialog } from "@/components/ui/drawerDialog";
import { Actor } from "xstate";

const AuthContext = React.createContext<Actor<typeof authMachine>>(
    {} as Actor<typeof authMachine>,
);

function Auth({ open, onClose }: { open: boolean; onClose?: () => void }) {
    const actorRef = React.useContext(AuthContext);
    const state = useSelector(actorRef, (state) => state, shallowEqual);
    const [_open, setOpen] = React.useState(
        (state.value !== "loggedIn" && open) || false,
    );

    React.useEffect(() => {
        if (state.value === "loggedIn") {
            setOpen(false);
        }
    }, [state.value]);

    return (
        <DrawerDialog open={_open} onClose={onClose} forceDialog={true}>
            {state.matches("idle") && <Idle />}
            {state.matches("validatingId") && (
                <Loading message="Checking your email" />
            )}
            {state.matches("registeringId") && <RegisteringId />}
            {state.matches("creatingOTP") && (
                <Loading message="Sending verification code" />
            )}
            {state.matches("waitingOTP") && (
                <WaitingOTP email={state.context.id} />
            )}
            {state.matches("validatingOTP") && (
                <Loading message="Validating code" />
            )}
            {state.matches("registeringPin") && <RegisteringPin />}
            {state.matches("confirmingPin") && <ConfirmingPin />}
            {state.matches("registeringAccount") && (
                <Loading message="Registering account" />
            )}
            {state.matches("waitingPin") && <WaitingPin />}
            {state.matches("validatingPin") && (
                <Loading message="Validating pin" />
            )}
        </DrawerDialog>
    );
}

function State() {
    const actorRef = React.useContext(AuthContext);
    const state = useSelector(actorRef, (state) => state, shallowEqual);
    return (
        <code className="text-xs mt-12">
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </code>
    );
}

type UseSimpl3AuthArgs = {
    appId: string;
    debug?: boolean;
};

export function useSimpl3Auth({ appId, debug = false }: UseSimpl3AuthArgs) {
    const [open, setOpen] = React.useState(false);
    const actorRef = useActorRef(authMachine, { input: { appId } });
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

    actorRef.subscribe((snapshot) => {
        if (snapshot.value === "loggedIn") {
            setIsLoggedIn(true);
            setOpen(false);
        } else {
            setIsLoggedIn(false);
        }
    });

    function Simpl3AuthProvider({ children }: { children: React.ReactNode }) {
        return (
            <AuthContext.Provider value={actorRef}>
                <Auth open={open} onClose={() => setOpen(false)} />
                {children}
                {debug && <State />}
            </AuthContext.Provider>
        );
    }

    return {
        AuthContext,
        Simpl3AuthProvider,
        isLoggedIn,
        openAuth: () => setOpen(true),
        logout: () => {
            console.log("LOGOUT");
            if (isLoggedIn) {
                actorRef.send({ type: "reset" });
            }
        },
    };
}
