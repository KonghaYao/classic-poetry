import { Select, Space } from "@arco-design/web-react";
import { useRequest, useMount } from "ahooks";
import { FunctionComponent, useEffect, useState } from "react";
const Option = Select.Option;
export const FontChange: FunctionComponent<{}> = () => {
    const defaultFont = {
        path: "",
        name: "默认字体",
        fontFamily: "Noto Serif SC",
    };
    type FontMessage = { name: string; path: string; fontFamily: string };
    const { loading, data, error } = useRequest<FontMessage[], any>(
        async () => {
            return fetch(
                "https://fastly.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/assets/index.json"
            ).then((res) => res.json());
        },
        {
            onSuccess(data, params) {
                data.unshift(defaultFont);
            },
        }
    );
    const [usingFont, setUsingFont] = useState<FontMessage>(defaultFont);
    useEffect(() => {
        document.body.style.fontFamily = `"${usingFont.fontFamily}"`;
    }, [usingFont]);
    const pathToURL = (path: string) => {
        return `https://fastly.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/${path}/result.css`;
    };

    return (
        <Space size="large">
            {usingFont.path && (
                <link rel="stylesheet" href={pathToURL(usingFont.path)} />
            )}
            <Select
                defaultValue={"默认字体"}
                loading={loading}
                error={!!error}
                style={{ width: "10rem" }}
                onChange={(value: string) => {
                    setUsingFont(data!.find((i) => i.name === value)!);
                }}>
                <Select.OptGroup label="正在使用" key="0">
                    <Option
                        key={usingFont.fontFamily}
                        value={usingFont.name}
                        disabled>
                        {usingFont.name}
                    </Option>
                </Select.OptGroup>
                <Select.OptGroup label="字体列表" key="1">
                    {!loading &&
                        data!.map((option, index) => {
                            if (option.fontFamily === usingFont.name) return "";
                            return (
                                <Option key={option.path} value={option.name}>
                                    {option.name}
                                </Option>
                            );
                        })}
                </Select.OptGroup>
            </Select>
        </Space>
    );
};
