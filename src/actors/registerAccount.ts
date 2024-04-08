import { client } from "@/lib/gql";
import { fromPromise } from "xstate";

export const registerAccount = fromPromise<
    { success: boolean },
    { code?: string; id?: string; appId?: string }
>(async ({ input }) => {
    const MUTATION = `
        mutation registerAccount($id: String!, $pin: String!, $appId: String!) {
            registerAccount(id: $id, pin: $pin, appId: $appId) {
                success
            }
        }
    `;

    try {
        const result = await client.mutation(MUTATION, {
            id: input.id,
            pin: input.code,
            appId: input.appId,
        });

        return {
            success: result.data.registerAccount?.success || false,
        };
    } catch (e) {
        return { success: false };
    }
});
