import { InputNumber } from "@arco-design/web-react";
import { FC } from "react";
import { Setting, SettingServer } from "..";

export const TextSetting: FC<{}> = () => {
    return (
        <div>
            <InputNumber
                mode="button"
                defaultValue={Setting.text.fontSize}
                min={12}
                max={50}
                onChange={(i) =>
                    SettingServer.emit("change", { text: { fontSize: i } })
                }
            />
        </div>
    );
};
