import { memoize } from "lodash-es";
import { MeiliSearch } from "meilisearch";
/** 服务器使用的版本 */
export const getClient = () => {
    const client = new MeiliSearch({
        host: "https://meilisearch-konghayao.cloud.okteto.net",
        apiKey: "1234567890",
    });
    return client.index("poetries");
}
/** 浏览器使用的版本 */
export const getIndex = memoize(getClient);