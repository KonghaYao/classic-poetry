import { Menu } from "@arco-design/web-react";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarServer } from "../global";
import { useUnmount } from "ahooks";
import { FetchData } from "./ShiJing";

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
            <Menu.Item key="side-index">
                <NavLink to={`/shijing`}>索引</NavLink>
            </Menu.Item>
            {data.map((i, index) => {
                return (
                    //  诗经中确实有重名的篇章，所以采用这种 key
                    <Menu.Item key={"side-" + index + i.title}>
                        <NavLink to={`/shijing/${i.title}`}>{i.title}</NavLink>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
