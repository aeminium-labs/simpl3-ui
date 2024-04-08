import { Client, cacheExchange, fetchExchange } from "@urql/core";

export const client = new Client({
    url:
        process.env.NEXT_PUBLIC_SIMPL3_ENDPOINT ||
        "https://api.simpl3.dev/graphql",
    exchanges: [cacheExchange, fetchExchange],
});
