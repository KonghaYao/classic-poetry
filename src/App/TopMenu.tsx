import { FunctionComponent } from "react";
import { Menu, Space } from "@arco-design/web-react";
import { FontChange } from "./FontChange";
import { ThemeChange } from "./ThemeChange";
const MenuItem = Menu.Item;
export const TopMenu: FunctionComponent<{}> = (args) => {
    const json: { name: string }[] = [{ name: "这是一个" }];

    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            onClickSubMenu={(key) => {}}>
            <Space size="large" align="center">
                <FontChange />
                <ThemeChange></ThemeChange>
            </Space>
            {json.map((item, index) => {
                return <MenuItem key={index.toString()}>{item.name}</MenuItem>;
            })}
        </Menu>
    );
};
