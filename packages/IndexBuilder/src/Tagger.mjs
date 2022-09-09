export const Tagger = {
    gen(i) {
        const firstPara = i.content[0] || "";
        const lastPara = i.content[i.content.length - 1] || "";
        return [
            i.title,
            i.subTitle,
            i.author,
            firstPara.slice(0, 2) + lastPara.slice(0, 2),
        ]
            .join("-")
            .replace("/", "-")
            .replace(" ", "_");
    },
    match(i, tag) {
        return this.gen(i) === tag;
    },
};
