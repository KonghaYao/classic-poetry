import {
    Form,
    InputNumber,
    Radio,
    Select,
    Tooltip,
} from "@arco-design/web-react";
import { FC } from "react";
import { SettingServer, useSetting } from "..";
import { Setting } from "../Setting";
import { FontChange } from "../../App/FontChange";
import { CnCaseSupport } from "../../poetry/utils/CnCaseSupport";
import { IconExclamationCircle } from "@arco-design/web-react/icon";

const Hint: FC<{
    message: string;
}> = ({ message }) => {
    return (
        <Tooltip content={message}>
            <span
                style={{
                    margin: "2rem",
                }}>
                <IconExclamationCircle />
            </span>
        </Tooltip>
    );
};
export const TextSetting: FC<{}> = () => {
    const { setting, server } = useSetting();
    return (
        <Form>
            <Form.Item label="全局字体种类">
                <FontChange />
                <Hint message="请稍等几秒钟加载字体"></Hint>
            </Form.Item>
            <Form.Item label="字重">
                <Select
                    defaultValue={setting.text.fontWeight}
                    onChange={(i) =>
                        SettingServer.emit("change", {
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
            <Form.Item label="正文字体大小">
                <InputNumber
                    mode="button"
                    defaultValue={Setting.text.fontSize}
                    min={12}
                    max={50}
                    suffix="px"
                    onChange={(i) =>
                        SettingServer.emit("change", { text: { fontSize: i } })
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
                        SettingServer.emit("change", {
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
            <Form.Item label="中文繁简体转换">
                <Radio.Group
                    type="button"
                    defaultValue={setting.theme.cnCase}
                    onChange={(label) => {
                        CnCaseSupport().then(() => {
                            server.emit("change", { theme: { cnCase: label } });
                        }); // 直接开始加载数据
                        server.emit("change", { theme: { cnCase: label } });
                    }}
                    options={["默认", "简体", "繁体"]}></Radio.Group>
                <Hint message="为保证阅读的流畅度，可以将古文中的简繁体进行切换"></Hint>
            </Form.Item>
        </Form>
    );
};
