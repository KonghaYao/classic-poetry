import { MeiliSearch } from "meilisearch";
export const getClient = () => {
    const client = new MeiliSearch({
        host: "https://meilisearch-konghayao.cloud.okteto.net",
        apiKey: "KONGHAYAO_FOR_CHINESEPOETRY",
    });
    return client;
};
