import { Empty } from "@arco-design/web-react";
import { IconClose, IconLoading } from "@arco-design/web-react/icon";
import { useRequest } from "ahooks";

/** 加载数据的一个组件，带有回馈信息 */
export const Requester = function <T>(props: {
    url: string;
    element: (data: T) => JSX.Element;
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
            {loading && (
                <Empty
                    icon={
                        <div
                            style={{
                                background: "#f2994b",
                                display: "inline-flex",
                                borderRadius: "50%",
                                width: 50,
                                height: 50,
                                fontSize: 30,
                                alignItems: "center",
                                color: "white",
                                justifyContent: "center",
                            }}>
                            <IconLoading />
                        </div>
                    }
                    description="加载数据中"
                />
            )}
            {error && (
                <Empty
                    icon={
                        <div
                            style={{
                                background: "var(--red-6)",
                                display: "inline-flex",
                                borderRadius: "50%",
                                width: 50,
                                height: 50,
                                fontSize: 30,
                                alignItems: "center",
                                color: "white",
                                justifyContent: "center",
                            }}>
                            <IconClose />
                        </div>
                    }
                    description="数据加载错误了"
                />
            )}
            {!error && !loading && props.element(data!)}
        </>
    );
};