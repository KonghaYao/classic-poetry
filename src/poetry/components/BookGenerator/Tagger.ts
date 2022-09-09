import { TaggerType, InnerObjectType, ObjectProvider } from "./CommonBook";
/** @ts-ignore */
import { Tagger as _T } from "../../../../packages/IndexBuilder/src/Tagger.mjs";

// 使用全局统一的 Tagger 保证代码不出错
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
