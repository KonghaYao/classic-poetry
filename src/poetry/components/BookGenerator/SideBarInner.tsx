import { Menu } from "@arco-design/web-react";
import { FC, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { sidebarServer } from "../../global";
import { useUnmount } from "ahooks";
import { InnerObjectType } from "./CommonBook";
import { Tagger } from "./Tagger";
export function SideBarInner({
    data,
    root,
}: {
    data: InnerObjectType[];
    root: string;
}) {
    let { poetryId } = useParams()!;
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
            defaultSelectedKeys={[poetryId!]}
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
            {data.map((i) => {
                const tag = Tagger.gen(i);
                return (
                    //  诗经中确实有重名的篇章，所以采用这种 key
                    <Menu.Item key={"side-" + tag} defaultValue={tag}>
                        <NavLink to={`${root}/${tag}`}>{i.title}</NavLink>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
}
