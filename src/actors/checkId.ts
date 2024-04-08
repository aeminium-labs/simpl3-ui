import { client } from "@/lib/gql";
import { fromPromise } from "xstate";

export const checkId = fromPromise<
    { isRegistered: boolean },
    { id?: string; appId?: string }
>(async ({ input }) => {
    const QUERY = `
        query checkAccount($id: String!, $appId: String!) {
            checkAccount(id: $id, appId: $appId) {
                isRegisteredInApp
              }
        }
    `;

    try {
        const result = await client.query(QUERY, {
            id: input.id,
            appId: input.appId,
        });

        return {
            isRegistered: result.data.checkAccount?.isRegisteredInApp || false,
        };
    } catch (e) {
        return {
            isRegistered: false,
        };
    }
});
