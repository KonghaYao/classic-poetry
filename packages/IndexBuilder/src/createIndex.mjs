import fse from "fs-extra";
const PreProcess = (i) => {
    i.content = i.content.join("\n");
    delete i.notes;
    return i;
};

Promise.all(
    fse.readdirSync("./dist").map((i) => fse.readJSON("./dist/" + i))
).then((data) => {
    const info = data.flat().map(PreProcess);

    const chunk = (info, size, cb) => {
        let num = Math.floor(info.length / size);
        while (num >= 0) {
            const json = info.slice(num * size, (num + 1) * size);
            cb(json, num);
            num--;
        }
    };
    console.log(info.length);
    chunk(info, 1000, (json, index) =>
        fse.writeJSON("./json/" + index + ".json", json)
    );
});
