import { Menu } from "@arco-design/web-react";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarServer } from "../global";
import { useUnmount } from "ahooks";

export const SideBarInner: FC<{
    poetryId: string;
    data: any;
    root: string;
    Tagger: { gen: (s: any) => string };
    titleName?: string;
}> = ({ poetryId, data, root, Tagger, titleName = "title" }) => {
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
            ellipsis
            style={{
                width: "10rem",
                display: showMenu ? "flex" : "none",
                margin: "0",
                overflow: "auto",
            }}>
            <Menu.Item key="side-index">
                <NavLink to={root}>索引</NavLink>
            </Menu.Item>
            {data.map((i: any) => {
                return (
                    //  诗经中确实有重名的篇章，所以采用这种 key
                    <Menu.Item key={"side-" + Tagger.gen(i)}>
                        <NavLink to={`${root}/${Tagger.gen(i)}`}>
                            {i[titleName]}
                        </NavLink>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
