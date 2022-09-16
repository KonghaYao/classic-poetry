import { Form, InputNumber, Radio, Select } from "@arco-design/web-react";
import { FC } from "react";
import { useSetting } from "..";
import { Setting } from "../Setting";
import { FontChange } from "../../App/FontChange";
import { CnCaseSupport } from "../../poetry/utils/CnCaseSupport";
import { Hint } from "./Hint";

export const TextSetting: FC<{}> = () => {
    const { setting, server } = useSetting();
    return (
        <Form layout="vertical">
            <Form.Item label="字体种类">
                <FontChange />
                <Hint message="请稍等几秒钟加载字体"></Hint>
            </Form.Item>
            <Form.Item label="字重">
                <Select
                    defaultValue={setting.text.fontWeight}
                    onChange={(i) =>
                        server.emit("change", {
                            text: { fontWeight: i },
                        })
                    }>
                    {[...Array(9).keys()].map((i) => {
                        return (
                            <Select.Option
                                key={"font-weight-" + i}
                                value={(i + 1 * 100).toString()}>
                                {(i + 1) * 100}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="字体大小">
                <InputNumber
                    mode="button"
                    defaultValue={Setting.text.fontSize}
                    min={12}
                    max={50}
                    suffix="px"
                    onChange={(i) =>
                        server.emit("change", { text: { fontSize: i } })
                    }
                />
            </Form.Item>
            <Form.Item label="字间距">
                <InputNumber
                    mode="button"
                    defaultValue={Setting.text.letterSpacing}
                    min={0}
                    step={0.1}
                    max={1}
                    suffix="字"
                    onChange={(i) =>
                        server.emit("change", {
                            text: { letterSpacing: i },
                        })
                    }
                />
            </Form.Item>
            <Form.Item label="主题">
                <Radio.Group
                    type="button"
                    name="position"
                    defaultValue={setting.theme.base}
                    onChange={(label) => {
                        server.emit("change", { theme: { base: label } });
                    }}
                    options={["light", "dark", "auto"]}></Radio.Group>
            </Form.Item>
            <Form.Item label="繁简转换">
                <Radio.Group
                    type="button"
                    defaultValue={setting.theme.cnCase}
                    onChange={(label) => {
                        CnCaseSupport().then(() => {
                            server.emit("change", { theme: { cnCase: label } });
                        }); // 直接开始加载数据
                    }}
                    options={["默认", "简体", "繁体"]}></Radio.Group>
                <Hint message="为保证阅读的流畅度，可以将古文中的简繁体进行切换"></Hint>
            </Form.Item>
            <Form.Item label="文本排列">
                <Radio.Group
                    type="button"
                    defaultValue={setting.theme.cnList}
                    onChange={(label) => {
                        server.emit("change", { theme: { cnList: label } });
                    }}
                    options={["竖排", "横排"]}></Radio.Group>
                <Hint message="古文竖排的效果好"></Hint>
            </Form.Item>
        </Form>
    );
};
