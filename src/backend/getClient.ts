import { memoize } from "lodash-es";
import { MeiliSearch } from "meilisearch";
/** 服务器使用的版本 */
export const getClient = () => {
    const client = new MeiliSearch({
        host: "https://ms-7d12842fe386-5010.sgp.meilisearch.io",
        apiKey: "cda948750d1d469e892b40b5aaeeedbe70a18b0a0252477949bafaa8284ebf4c",
    });
    return client.index("poetries");
}
/** 浏览器使用的版本 */
export const getIndex = memoize(getClient);