import { lazy, ComponentType, Suspense } from "react";
import { Loading } from "./Loading";
export function AsyncLoad<T extends ComponentType<any>, K extends string>(
    importFn: () => Promise<Record<K, T>>,
    /** 如果不是 default 导出，那么可以使用这个变量改写 */
    key?: K,
    /** TODO 暂时不知道怎么获取 props 类型 */
    props?: any,
    fallback?: JSX.Element | null
) {
    /** @ts-ignore */
    key = key || "default";
    const AsyncLoadComponent = lazy(async () => {
        const module = await importFn();
        return { default: module[key!] };
    });
    return (
        <Suspense
            fallback={fallback !== undefined ? fallback : <Loading></Loading>}>
            <AsyncLoadComponent {...props} />
        </Suspense>
    );
}
