import { Select, Space } from "@arco-design/web-react";
import { useRequest, useMount } from "ahooks";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useSetting } from "../Setting";
const Option = Select.Option;
const defaultFont = {
    path: "",
    name: "默认字体",
    fontFamily: "Noto Serif SC",
};
type FontMessage = { name: string; path: string; fontFamily: string };
export const FontChange: FunctionComponent<{}> = () => {
    const { setting, server } = useSetting();
    const { loading, data, error } = useRequest<FontMessage[], any>(
        async () => {
            return fetch(
                "https://fastly.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/assets/index.json"
            ).then((res) => res.json());
        },
        {
            onSuccess(data) {
                data.unshift(defaultFont);
            },
        }
    );
    const usingFont = useMemo(() => setting.text.font, [setting]);
    useEffect(() => {
        // 触发全局样式改动
        document.body.style.setProperty(
            "--book-font-family",
            `"${setting.text.font.fontFamily}", "Noto Serif SC"`
        );
    }, [setting]); //

    const pathToURL = (path: string) => {
        return `https://fastly.jsdelivr.net/gh/KonghaYao/chinese-free-web-font-storage/${path}/result.css`;
    };

    return (
        <Space size="large">
            {usingFont.path && (
                <link rel="stylesheet" href={pathToURL(usingFont.path)} />
            )}
            <Select
                value={setting.text.font.name}
                loading={loading}
                error={!!error}
                style={{ width: "10rem" }}
                onChange={(value: string) => {
                    server.emit("change", {
                        text: { font: data!.find((i) => i.name === value)! },
                    });
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
