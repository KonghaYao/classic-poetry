import { Menu } from "@arco-design/web-react";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarServer } from "../global";
import { useUnmount } from "ahooks";
import { FetchData } from "./SiShuWuJing";
import { ExtraLink } from "./IndexPage";

export const SideBar: FC<{ poetryId: string; data: FetchData }> = ({
    poetryId,
    data,
}) => {
    const [showMenu, setMenu] = useState(true);
    const handlerVisibleChange = (visible: boolean | undefined) => {
        typeof visible === "boolean" ? setMenu(visible) : setMenu(!showMenu);
    };
    sidebarServer.on("toggleVisible", handlerVisibleChange);
    useUnmount(() => {
        sidebarServer.off("toggleVisible", handlerVisibleChange);
    });
    return (
        <Menu
            defaultSelectedKeys={[poetryId]}
            style={{
                width: "fit-content",
                display: showMenu ? "flex" : "none",
                margin: "0",
                overflow: "auto",
            }}>
            <Menu.Item key="index">
                <NavLink to={`/sishuwujing`}>索引</NavLink>
            </Menu.Item>
            {data.map((i) => {
                return (
                    <Menu.Item key={i.chapter}>
                        <NavLink to={`/sishuwujing/${i.chapter}`}>
                            {i.chapter}
                        </NavLink>
                    </Menu.Item>
                );
            })}
            {ExtraLink.map((i) => {
                return (
                    <Menu.Item key={i.title}>
                        <NavLink to={i.to}>{i.title}</NavLink>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
