import { Form, InputNumber, Radio } from "@arco-design/web-react";
import { FC } from "react";
import { Setting, SettingServer, useSetting } from "..";
import { FontChange } from "../../App/FontChange";

export const TextSetting: FC<{}> = () => {
    const { setting, server } = useSetting();
    return (
        <Form>
            <Form.Item label="全局字体种类">
                <FontChange />
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
                    style={{ marginBottom: 40 }}
                    options={["light", "dark", "auto"]}></Radio.Group>
            </Form.Item>
        </Form>
    );
};
