import { memoize } from "lodash-es";
import { MeiliSearch } from "meilisearch";
export const getIndex = memoize(() => {
    const client = new MeiliSearch({
        host: "https://ms-7d12842fe386-5010.sgp.meilisearch.io",
        apiKey: "cda948750d1d469e892b40b5aaeeedbe70a18b0a0252477949bafaa8284ebf4c",
    });
    return client.index("poetries");
});
