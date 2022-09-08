import fse from "fs-extra";
import zlib from "zlib";
const { readdirSync, outputFileSync, readJSONSync } = fse;
import path from "path";
const temp = {
    root: "./node_modules/chinese-poetry/ci",
    filter(i) {
        console.log(i);
        return i.startsWith("ci.song");
    },
    transform(i) {
        return { ...i, title: i.rhythmic, content: i.paragraphs };
    },
    dist: "./dist/ci.index.gzip",
};

const setting = {
    gzip: true,

    // 将标准的对像转化为需要的 json 对象
    transform(i) {
        return this.gen(i);
    },

    gen(i) {
        // 这个是 前端项目中的 Trigger 文件 gen 函数
        const firstPara = i.content[0] || "";
        const lastPara = i.content[i.content.length - 1] || "";
        return [
            i.title,
            i.subTitle,
            i.author,
            firstPara.slice(0, 2) + lastPara.slice(0, 2),
        ]
            .join("-")
            .replace("/", "-");
    },
};
async function start(temp, setting) {
    const fileList = readdirSync(temp.root);

    const file = fileList.filter(temp.filter).map((res) => {
        return {
            path: res,
            json: readJSONSync(path.join(temp.root, res)),
        };
    });
    let final = file
        .flatMap((i) => {
            return [
                ">--" + i.path,
                ...i.json
                    .map(temp.transform)
                    .map((ii) => setting.transform(ii)),
            ];
        })
        .join("\n");

    setting.gzip &&
        (final = zlib.gzipSync(final, {
            level: 9,
        }));
    outputFileSync(temp.dist, final);
}
start(temp, setting);
