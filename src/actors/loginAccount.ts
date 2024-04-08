import { client } from "@/lib/gql";
import { fromPromise } from "xstate";

export const loginAccount = fromPromise<
    { pubKey: string | null },
    { code?: string; id?: string; appId?: string }
>(async ({ input }) => {
    const QUERY = `
        query loginAccount($id: String!, $pin: String!, $appId: String!) {
            loginAccount(id: $id, pin: $pin, appId: $appId) {
                pubKey
            }
        }
    `;

    try {
        const result = await client.query(QUERY, {
            id: input.id,
            pin: input.code,
            appId: input.appId,
        });

        return {
            pubKey: result.data.loginAccount?.pubKey || null,
        };
    } catch (e) {
        return { pubKey: null };
    }
});
