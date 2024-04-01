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
    /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWQPYWQBsA6ASwkLAGIwA7dMAJwEkIBtABgF1FQAHXLFLpSuWrxAAPRAEYATAE4ZxAOwcAzBwUAWFerkyZADgBsAGhABPWTIUriRuSYCsz9Sblz1zjioC+fhZoWHgEJABuROTIIrRQrFQQYmBktOG4ANYpAMaYYNkZrJw8SCACQiJiEtIIttpyDgocJgpyRr4eThbWtXIqJsQmKo4GJjIqCibaAUEYOPhExJGE0bHxEInJqelZxLn5hewyJfyCwqLipTUy6uPE6iraSqb6Ls7a3bKK6qoTRipeTz-SYzEDBeZhJZRAhrBJJWgpUhpTI5PIFIpyE5lM6VS6ga46BpGJotNodTzmKxfRTEcaOWymTxtOSg8GhRbLVZI9Y0RiMXCMYh8QgxABmAoAtns0YdihJyucqldZC1tKp1Np3JpnP1DJ9ajITAN6kZjBMZNpNSZWXN2SQAO7Ic5xAAKSJo9CYbtoctKCtx1UQci0HGIPg4cmcppM9P1MlczlU7Q4zgtXjGTxtIQWJEYYE5MO5ABF86RstRsmJRaRGBLfacKhdAwgjE9iAoHu9W85I48FPr-gNde49FGOPGsxDFnmCzFi6Xy1Q8wArfLoevYxtK-GIVsKdud7Td3tPOMcS3Ecfx9wpvp2ZyTu3EPNQUiwBiMbkJSu0au1jf+k2yoIMGCiJsMaaTJqChgZSPQwYmdIaE8EbvCCgRgraObPmAr7vkwX4bCua4ATiQE7iBhihhoFraKmwxgUYZ50YMEHuEo556EYj7YdkeZznEADyAAqLqbAi2wosQsB0BAIkuqRW54lIXxKKoGhaLo+iGKYA4qPYJocK28a+CozgKDxkJ8WAAlQPJvL8oKwpipK0myfJimKsp1wRkYqg9kahhRiY54Doa9yWv0fT1LcKaWRy0K2d64mIsiux8EiABqiXoAKnkBsB3jKDRTjao4RipnBsjaBaYaKK06ivMZD4YWy2GzmsyXwqlOwpBltDZSsMJ5cc8pkduKkIEVl63KVKblZVcZDAMPYwWo7RgehszZpCHXcslTCOUKIroOKtZCllOV5dwY1Kc200lSYZVtItVK1P0+5HrcxK9h2UzxQ6TprPZdAfh5N1+uN3nVWMl4cPD8gvO4cgfG9Hh+SF8b-F46imv8APEI6zp2aJS5gOgjCWPl5GTXURIkq07RRV0b1qPYQx-PIUwKEY6gWa1WG7Tl3L2d1km7Lg6B8INqzXVigETdcijKGomg6HoBjGFVLY0ozRleGB54RgTe1CaTYtIr1xCS9LV2MGwo2Q3dwHyGpquaRrOna1GygyOOUbvMM+vcQLO0JUNtmi1sltSTbMvDfbmK3V5zauyrGnq9pWv6kM+5+-GOoeA8HgyCbwtm2Jh0CsdLnnXHdvU4rqnp2rWma7prMApe7ypm07gWvIBMvm+H77e6oNekijfQyBRn7l4mrOFMigTHGdwWt2jXxrYPj+KHU4kD+f4SmPtAeh+3rT6nyvqa3nvZ299T2PnIWt+MkYE0fNYn664+eowl9HYNhTi7Xygwl5AlsC4AE2tTRhnhvDXGvhGqMU-lWb+p8yYyXXBDYBBUKJp1vh7LOHceh93uKmKMHYOwQV8EPXCI8CJxAAILZErKgegKVxYpGHvhRgrD2H0Cvi7QkjRmh62ZtrbQsMKpY2kfDAwTwWrbQPjhPCo8WFsNwBw9ADlq7OVOq5XhH4BHaKEbgzcICCGiOJOIskkj9Q1TVEVKMbRLS6CUNMfeT5CC4CgDACAzAz6SHfDEFIyBRQfgABR+3hgASioG1SEvj-GQCCcIiivM1S9m7C0B4FUmJvTTD8P2rQYKeHMmZdQBMUkBKCawSgWDyYZNpvIewPNLQLx7DqZwcZGp+VWsMEKugjIVQCBhWg+A4ASCSUQZO+DJoAFptaLMTDBGCLghg+BGDoAm5BKDzJpj5NwxA2jyGkUyXwkYzyplUBmbGdFEZlwjrCCAhym61G5u2C0WgAQalGNreQxh2xnOJEMccKhjAEyJp1JE7yZ6eAvKrZGAcbiAr6AMZe0jLStCtPQ02UASzhDLGAeFzYpgDAQeObS-Q6L9jekYRltJ3D1ELjim49D1FMPWGS4CiK1TIo8Ki9w+oYIDLJHYMyKYNReJUU+aykdRK8oonYfcYEdSMoeJMMyhSeimD8q2XQUwnjtGkdU7x7Vy5QG9Mqya9Q4w1UxRMJorgPBmSPNCoGIslVOysbTZeYY3A-M1LjFG+p1q0iDiMvQdh6jPK5BXW1NRJg-AqjoAurYATSP1AHA8TwnAhhcCyC1kJjHcptb6hZNR+W3xRbIkVb0b7BnjJjLQ4wOxoN-Bg3+ykFYzz9rDcphpIU3FcLq2QDw4YIMhRC4YKNOWMM-JowR6Ak0qg0KckqNwslgRUI488tJ-aPCjP8HsIc5XYVqWk3tUNyXSPVJaZoRlflgT6U0S8ih-hmTFUCGpfi6m0AaaSytRzZDjgGGBTQT0oKtm8A62wh7cWuIjGi8ZfggA */
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
            after: {
                "1000": "loggedInIdle",
            },
        },
        loggedInIdle: {
            exit: "resetContext",
            on: {
                reset: {
                    target: "idle",
                    reenter: true,
                },
            },
        },
    },
});
