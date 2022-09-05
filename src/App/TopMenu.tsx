import { FunctionComponent } from "react";
import { Menu, Space } from "@arco-design/web-react";
import { FontChange } from "./FontChange";
import { ThemeChange } from "./ThemeChange";
import { useSetting } from "../Setting";
import { IconAlignRight } from "@arco-design/web-react/icon";

export const TopMenu: FunctionComponent<{}> = (args) => {
    const { init, server } = useSetting();
    return (
        <Menu
            mode="horizontal"
            style={{
                borderBottom: "1px solid var(--divide-gold)",
            }}>
            <Space size="large" align="center">
                <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    中华诗词大典
                </div>
                <FontChange />
                <ThemeChange></ThemeChange>
                {init()}
                <div
                    onClick={() => {
                        server.emit("toggle", true);
                    }}>
                    <IconAlignRight></IconAlignRight>
                </div>
            </Space>
        </Menu>
    );
};
