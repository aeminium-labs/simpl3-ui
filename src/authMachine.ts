import { setup, assign, fromPromise } from "xstate";

export const authMachine = setup({
    types: {
        context: {} as {
            appId: string;
            pin?: string;
            id?: string;
            isRegistered?: boolean;
            error?: string;
        },
        events: {} as
            | { type: "reset" }
            | { type: "retry" }
            | { type: "enterOTP"; value: string }
            | { type: "enterPin"; value: string }
            | { type: "enterId"; value: string }
            | { type: "confirm" }
            | { type: "reject" },

        input: {} as {
            appId: string;
        },
    },
    actions: {
        saveId: assign({
            id: ({ context, event }) => {
                if (event.type === "enterId") {
                    return event.value;
                }

                return context.id;
            },
        }),
        savePin: assign({
            pin: ({ context, event }) => {
                if (event.type === "enterPin") {
                    return event.value;
                }

                return context.pin;
            },
        }),
        erasePin: assign({
            pin: "",
        }),
        saveError: (_, params: unknown) => {
            if (
                params &&
                typeof params === "object" &&
                "errorMessage" in params
            ) {
                const msg = params?.errorMessage;

                return assign({
                    error: () => msg,
                });
            }
        },
        resetContext: assign({
            id: "",
        }),
    },
    actors: {
        checkId: fromPromise<{ isRegistered: boolean }, { id?: string }>(
            async ({ input }) => {
                return await new Promise((resolve) =>
                    setTimeout(resolve, 2000, {
                        isRegistered:
                            input && input.id === "braposo@madesimpl3.com"
                                ? true
                                : false,
                    }),
                );
            },
        ),
        sendOTP: fromPromise(async () => {
            return await new Promise((resolve) =>
                setTimeout(resolve, 2000, true),
            );
        }),
        validatePin: fromPromise<
            { isValid: boolean },
            { code?: string; id?: string }
        >(async ({ input }) => {
            return await new Promise((resolve) =>
                setTimeout(resolve, 2000, {
                    isValid: input.code === "123456" ? true : false,
                }),
            );
        }),
        validateOTP: fromPromise<
            { isValid: boolean; isRegistered: boolean },
            { code?: string; id?: string }
        >(async ({ input }) => {
            return await new Promise((resolve) =>
                setTimeout(resolve, 2000, {
                    isValid: input && input.code === "12345678" ? true : false,
                    isRegistered:
                        input && input.id === "new@madesimpl3.com"
                            ? true
                            : false,
                }),
            );
        }),
        registerAccount: fromPromise<{ isValid: boolean }, { code?: string }>(
            async ({ input }) => {
                return await new Promise((resolve) =>
                    setTimeout(resolve, 2000, {
                        isValid:
                            input && input.code === "12345678" ? true : false,
                    }),
                );
            },
        ),
    },
    guards: {
        pinMatches: function ({ context, event }) {
            if (event.type === "enterPin" && context.pin === event.value) {
                return true;
            }

            return false;
        },
    },
}).createMachine({
    context: ({ input }) => ({
        appId: input.appId,
    }),
    id: "authModal",
    initial: "idle",
    states: {
        idle: {
            on: {
                enterId: {
                    target: "validatingId",
                    actions: {
                        type: "saveId",
                    },
                },
            },
        },
        validatingId: {
            invoke: {
                id: "checkId",
                input: ({ context }) => ({
                    id: context.id,
                }),
                onDone: [
                    {
                        target: "waitingPin",
                        guard: ({ event }) => {
                            return event.output.isRegistered;
                        },
                    },
                    {
                        target: "revalidatingDevice",
                        guard: ({ event }) => {
                            return event.output.isRegistered;
                        },
                    },
                    {
                        target: "registeringId",
                    },
                ],
                onError: {
                    target: "validatingId",
                },
                src: "checkId",
            },
        },
        waitingPin: {
            on: {
                enterPin: {
                    target: "validatingPin",
                },
            },
        },
        revalidatingDevice: {
            on: {
                confirm: {
                    target: "creatingOTP",
                },
                reject: {
                    target: "idle",
                },
            },
        },
        registeringId: {
            on: {
                confirm: {
                    target: "creatingOTP",
                },
                reject: {
                    target: "idle",
                },
            },
        },
        creatingOTP: {
            invoke: {
                id: "sendOTP",
                input: {},
                onDone: {
                    target: "waitingOTP",
                },
                onError: {
                    target: "creatingOTP",
                },
                src: "sendOTP",
            },
        },
        validatingPin: {
            invoke: {
                id: "pinValidator",
                input: ({ event, context }) => {
                    if (event.type === "enterPin") {
                        return {
                            code: event.value,
                            id: context.id,
                        };
                    }

                    return {};
                },
                onDone: [
                    {
                        target: "loggedIn",
                        guard: ({ event }) => {
                            return event.output.isValid;
                        },
                    },
                    {
                        target: "waitingPin",
                        actions: {
                            type: "saveError",
                        },
                    },
                ],
                onError: {
                    target: "waitingPin",
                    actions: {
                        type: "saveError",
                    },
                },
                src: "validatePin",
            },
        },
        waitingOTP: {
            on: {
                enterOTP: {
                    target: "validatingOTP",
                },
                retry: {
                    target: "registeringId",
                },
            },
        },
        validatingOTP: {
            invoke: {
                id: "otpValidator",
                input: ({ event, context }) => {
                    if (event.type === "enterOTP") {
                        return {
                            code: event.value,
                            id: context.id,
                        };
                    }

                    return {};
                },
                onDone: [
                    {
                        target: "waitingPin",
                        guard: ({ event }) => {
                            return (
                                event.output.isValid &&
                                event.output.isRegistered
                            );
                        },
                    },
                    {
                        target: "registeringPin",
                        guard: ({ event }) => {
                            return event.output.isValid;
                        },
                    },
                    {
                        target: "waitingOTP",
                        actions: assign({
                            error: "asdafda",
                        }),
                    },
                ],
                onError: {
                    target: "waitingOTP",
                },
                src: "validateOTP",
            },
        },
        registeringPin: {
            on: {
                enterPin: {
                    target: "confirmingPin",
                    actions: {
                        type: "savePin",
                    },
                },
            },
        },
        confirmingPin: {
            on: {
                enterPin: [
                    {
                        target: "registeringAccount",
                        guard: {
                            type: "pinMatches",
                        },
                    },
                    {
                        target: "confirmingPin",
                    },
                ],
                reset: {
                    target: "registeringPin",
                },
            },
            exit: "erasePin",
        },
        registeringAccount: {
            invoke: {
                id: "registerAccount",
                input: {},
                onDone: {
                    target: "waitingPin",
                },
                onError: {
                    target: "registeringPin",
                },
                src: "registerAccount",
            },
        },
        loggedIn: {
            on: {
                reset: {
                    target: "idle",
                },
            },
            exit: "resetContext",
        },
    },
});
