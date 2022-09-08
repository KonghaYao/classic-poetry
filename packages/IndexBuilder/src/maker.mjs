import {
    caocaoshiji,
    chuci,
    yuanqu,
    nalanxingde,
    lunyu,
    shijing,
    sishuwujing,
    huajianji,
    nantang,
} from "./transformer.mjs";
import fse from "fs-extra";
import { Tagger } from "./Tagger.mjs";
const root = "./node_modules/chinese-poetry/";

const processSingle = async (template) => {
    const data = await fse.readJson(root + template.base);
    if (data instanceof Array) {
        return data.map((i) => template.transform(i));
    } else {
        return [template.transform(i)];
    }
};
[
    caocaoshiji,
    chuci,
    yuanqu,
    nalanxingde,
    lunyu,
    shijing,
    sishuwujing,
    huajianji,
    nalanxingde,
    nantang,
]
    .slice(0, 1)
    .map(async (template) => {
        let originData = [];
        if (typeof template.base === "string") {
            const data = await processSingle(template);
            originData.push(data);
        } else {
            await template.base.reduce((col, cur) => {
                return col.then(async (res) => {
                    const data = await processSingle(template);
                    originData.push(data);
                });
            }, Promise.resolve());
        }

        await fse.writeJSON(`./dist/${template.name}.json`, originData);
    });
