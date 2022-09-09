import { TaggerType, InnerObjectType, ObjectProvider } from "./CommonBook";
/** @ts-ignore */
import { Tagger as _T } from "../../../../packages/IndexBuilder/src/Tagger.mjs";
export const Tagger: TaggerType<InnerObjectType> = _T;
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
