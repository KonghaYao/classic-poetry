import { TaggerType, InnerObjectType, ObjectProvider } from "./CommonBook";

export const Tagger: TaggerType<InnerObjectType> = {
    gen(i) {
        return [i.title, i.subTitle, i.author, i.content[0].slice(0, 3)].join(
            "-"
        );
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
