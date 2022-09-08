import { TaggerType, InnerObjectType, ObjectProvider } from "./CommonBook";

export const Tagger: TaggerType<InnerObjectType> = {
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
            .replace("/", "-");
    },
    match(i, tag) {
        return this.gen(i) === tag;
    },
};
export const wrapAdapter = <T>(
    func: (i: T) => ObjectProvider
): ((i: T) => InnerObjectType) => {
    return (data) => {
        const i = func(data);
        /** @ts-ignore */
        i.tag = Tagger.gen(i);
        return i as InnerObjectType;
    };
};
