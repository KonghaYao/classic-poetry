import { Select, Space } from "@arco-design/web-react";
import { FunctionComponent } from "react";
import { useSetting } from "../Setting";

import { useFontChange } from "./useFontChange";

export const FontChange: FunctionComponent<{}> = () => {
    const { setting, server } = useSetting();
    const { usingFont, loading, error, data } = useFontChange();

    return (
        <Space size="large">
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
                    <Select.Option
                        key={usingFont.fontFamily}
                        value={usingFont.name}
                        disabled>
                        {usingFont.name}
                    </Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label="字体列表" key="1">
                    {!loading &&
                        data!.map((option, index) => {
                            if (option.fontFamily === usingFont.name) return "";
                            return (
                                <Select.Option
                                    key={option.path}
                                    value={option.name}>
                                    {option.name}
                                </Select.Option>
                            );
                        })}
                </Select.OptGroup>
            </Select>
        </Space>
    );
};
