import { FunctionComponent } from "react";
import { Menu, Space } from "@arco-design/web-react";
import { FontChange } from "./FontChange";
import { ThemeChange } from "./ThemeChange";

export const TopMenu: FunctionComponent<{}> = (args) => {
    return (
        <Menu mode="horizontal">
            <Space size="large" align="center">
                <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    中华诗词大典
                </div>
                <FontChange />
                <ThemeChange></ThemeChange>
            </Space>
        </Menu>
    );
};
