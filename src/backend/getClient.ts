import { memoize } from "lodash-es";
import { MeiliSearch } from "meilisearch";
/** 服务器使用的版本 */
export const getClient = () => {
    const client = new MeiliSearch({
        host: "http://43.153.192.127:7700",
        apiKey: "IkJDQ-jozWKVUTRuxdJd9Xn97U62Ka-FO6-FJdvUCIs",
    });
    return client.index("poetry");
};
/** 浏览器使用的版本 */
export const getIndex = memoize(getClient);
