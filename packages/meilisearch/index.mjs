import { MeiliSearch } from "meilisearch";
import fs from "fs-extra";
// 上传记录到 MeiliSearch
const client = new MeiliSearch({
    host: "https://ms-2783e6038de5-5330.sgp.meilisearch.io",
    apiKey: "081fc12aa65e890410a049bfd13149ea8106bd30",
});

await client.deleteIndex("poetries");
client.index("poetries");
const index_ = client.index("poetries");
index_.updateSearchableAttributes(["content", "author", "title"]);
index_.updateFilterableAttributes(["belongToName", "author"]);
let count = 0;
let index = 0;
while (index <= 64) {
    const text = await fs.readFileSync(`../IndexBuilder/json/${index}.json`);
    const input = JSON.parse(text).map((i) => {
        return { ...i, id: count++ };
    });
    await client.index("poetries").addDocuments(input, {});
    console.log(index);
    index++;
}
