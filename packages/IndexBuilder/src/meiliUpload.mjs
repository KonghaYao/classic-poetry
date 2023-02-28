// 上传至 meilisearch
import { MeiliSearch } from "meilisearch";
import fs from "fs-extra";

const client = new MeiliSearch({
    host: "https://meilisearch-konghayao.cloud.okteto.net",
    apiKey: "KONGHAYAO_FOR_CHINESEPOETRY",
});
const Index = client.index("poetry");

for (let index = 0; index < 65; index++) {
    const files = await fs.readJSON(`./json/${index}.json`);
    await Index.addDocuments(files);
    console.log(index);
}
