import { authMachine } from "@/machines/auth.machine";
import { shallowEqual, useActorRef, useSelector } from "@xstate/react";
import * as React from "react";
import { Idle } from "@/components/states/idle";
import { RegisteringId } from "@/components/states/registeringId";
// import { WaitingOTP } from "@/components/states/waitingOTP";
import { RegisteringPin } from "@/components/states/registeringPin";
import { ConfirmingPin } from "@/components/states/confirmingPin";
import { WaitingPin } from "@/components/states/waitingPin";
import { Loading } from "@/components/states/loading";
import { DrawerDialog } from "@/components/ui/drawerDialog";
import { Actor } from "xstate";
import { LoggedIn } from "@/components/states/loggedIn";

const AuthMachineContext = React.createContext<Actor<typeof authMachine>>(
    {} as Actor<typeof authMachine>,
);

const AuthModalContext = React.createContext<{
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});

const LoggedInContext = React.createContext<{
    isLoggedIn?: boolean;
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});

function Auth({ open, onClose }: { open: boolean; onClose?: () => void }) {
    const actorRef = React.useContext(AuthMachineContext);
    const state = useSelector(actorRef, (state) => state, shallowEqual);

    return (
        <DrawerDialog open={open} onClose={onClose} forceDialog={true}>
            {state.matches("idle") && <Idle />}
            {state.matches("validatingId") && (
                <Loading message="Checking your email" />
            )}
            {state.matches("registeringId") && <RegisteringId />}
            {/* {state.matches("creatingOTP") && (
                <Loading message="Sending verification code" />
            )}
            {state.matches("waitingOTP") && (
                <WaitingOTP email={state.context.id} />
            )}
            {state.matches("validatingOTP") && (
                <Loading message="Validating code" />
            )} */}
            {state.matches("registeringPin") && <RegisteringPin />}
            {state.matches("confirmingPin") && <ConfirmingPin />}
            {state.matches("registeringAccount") && (
                <Loading message="Registering account" />
            )}
            {state.matches("waitingPin") && <WaitingPin />}
            {state.matches("validatingPin") && (
                <Loading message="Validating pin" />
            )}
            {state.matches("loggedIn") && <LoggedIn message="Welcome!" />}
        </DrawerDialog>
    );
}

export function Simpl3AuthProvider({
    appId,
    children,
}: {
    appId: string;
    children: React.ReactNode;
}) {
    const actorRef = useActorRef(authMachine, { input: { appId } });
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <AuthMachineContext.Provider value={actorRef}>
            <AuthModalContext.Provider value={{ open, setOpen }}>
                <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                    <Auth open={open} onClose={() => setOpen(false)} />
                    {children}
                </LoggedInContext.Provider>
            </AuthModalContext.Provider>
        </AuthMachineContext.Provider>
    );
}

export function useSimpl3Auth() {
    const { setOpen } = React.useContext(AuthModalContext);
    const actorRef = React.useContext(AuthMachineContext);
    const { isLoggedIn, setIsLoggedIn } = React.useContext(LoggedInContext);

    actorRef.subscribe((snapshot) => {
        if (
            snapshot.value === "loggedIn" ||
            snapshot.value === "loggedInIdle"
        ) {
            if (!isLoggedIn) {
                setIsLoggedIn && setIsLoggedIn(true);
            }

            // Automatically close dialog
            if (snapshot.value === "loggedInIdle") {
                setOpen && setOpen(false);
            }
        } else {
            if (isLoggedIn) {
                setIsLoggedIn && setIsLoggedIn(false);
            }
        }
    });

    return {
        AuthContext: AuthMachineContext,
        isLoggedIn,
        openAuth: () => setOpen && setOpen(true),
        logout: () => {
            if (isLoggedIn) {
                actorRef.send({ type: "reset" });
            }
        },
        getAddress: () => actorRef.getSnapshot().context.address,
    };
}
