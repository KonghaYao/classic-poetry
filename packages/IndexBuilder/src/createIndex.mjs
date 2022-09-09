/**
 * 这个文件是将 dist 目录下的 json 准备成 分割后的 json 并放置在 json 文件夹下
 */
import fse from "fs-extra";
const temp = new Set();
/** 预先检查对象是否有误 */
const Checker = (i) => {
    try {
        if (i.content.some((i) => typeof i !== "string"))
            throw new Error("content has item not string");
    } catch (e) {
        console.log(i);
        throw e;
    }
};

const PreProcess = (i) => {
    Checker(i);
    i.content = i.content.join("\n");
    delete i.notes;
    i.id = i.tag;
    delete i.tag;
    return i;
};

Promise.all(
    fse.readdirSync("./dist").map((i) => fse.readJSON("./dist/" + i))
).then((data) => {
    let temp_dup = [];
    const info = data
        .flat()
        .filter((i) => {
            if (temp.has(i.tag)) {
                temp_dup.push(i.tag);
                return false;
            } else {
                temp.add(i.tag);
                return true;
            }
        })
        .map(PreProcess);
    temp_dup.forEach((i) => console.log(i));
    console.log("重复", temp_dup.length);
    const chunk = (info, size, cb) => {
        let num = Math.floor(info.length / size);
        while (num >= 0) {
            const json = info.slice(num * size, (num + 1) * size);
            cb(json, num);
            num--;
        }
    };
    console.log(info.length);
    fse.emptyDirSync("./json");

    const needChunk = true;
    if (needChunk) {
        chunk(info, 1000, (json, index) =>
            fse.writeJSON("./json/" + index + ".json", json)
        );
    } else {
        fse.writeJSON("./json/default.json", info);
    }
});