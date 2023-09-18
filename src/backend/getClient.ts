import { memoize } from "lodash-es";
import { MeiliSearch } from "meilisearch";
/** 服务器使用的版本 */
export const getClient = () => {
    const client = new MeiliSearch({
        host: "https://ms-2783e6038de5-5330.sgp.meilisearch.io",
        apiKey: "081fc12aa65e890410a049bfd13149ea8106bd30",
    });
    return client.index("poetries");
}
/** 浏览器使用的版本 */
export const getIndex = memoize(getClient);