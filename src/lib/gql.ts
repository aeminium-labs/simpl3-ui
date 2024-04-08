import { Client, fetchExchange } from "@urql/core";

export const client = new Client({
    url: "https://api.simpl3.dev/graphql",
    exchanges: [fetchExchange],
});
