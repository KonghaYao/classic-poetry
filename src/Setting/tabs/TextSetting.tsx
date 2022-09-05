import { Form, InputNumber } from "@arco-design/web-react";
import { FC } from "react";
import { Setting, SettingServer } from "..";
import { FontChange } from "../../App/FontChange";

export const TextSetting: FC<{}> = () => {
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
            <Form.Item label="正文字体大小">
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
        </Form>
    );
};
