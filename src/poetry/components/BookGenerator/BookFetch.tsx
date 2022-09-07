import { Requester } from "../Requester";
import { InnerObjectType, ObjectProvider } from "./CommonBook";

export type BookConverter<T> = {
    getData(): Promise<T[]>;

    /** 将单个对象转化为对应属性的元素 */
    adapter: (i: T) => ObjectProvider;
};
export function BookFetch<T>({
    getData,
    adapter,
    element,
}: {
    element: (i: InnerObjectType[]) => JSX.Element;
} & BookConverter<T>) {
    return Requester<T[], ObjectProvider[]>({
        getData,
        url: "",
        adapter(data) {
            return data.map(adapter);
        },
        /** @ts-ignore */
        element,
    });
}
