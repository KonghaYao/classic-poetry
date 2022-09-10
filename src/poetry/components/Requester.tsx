import { useRequest } from "ahooks";
import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";

/** 加载数据的一个组件，带有回馈信息 */
export const Requester = function <T, E = T>(props: {
    url: string;
    element: (data: E) => JSX.Element;
    adapter?: (data: T) => E;
    getData?: (url: string) => Promise<T>;
}) {
    const JSONFetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, loading, error } = useRequest<T, [string]>(
        () => (props.getData || JSONFetcher)(props.url),
        {
            cacheKey: props.url,
        }
    );

    return (
        <>
            {loading && <Loading></Loading>}
            {error && <ErrorMessage></ErrorMessage>}
            {!error &&
                !loading &&
                props.element(
                    props.adapter ? props.adapter(data!) : (data! as any as E)
                )}
        </>
    );
};
