import { Menu } from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { sidebarServer } from "./server";
import { useUnmount } from "ahooks";
import { InnerObjectType } from "../CommonBook";
import { Tagger } from "../Tagger";
import { BookContext, BookContextType } from "../BookContext";
import { SearchBar } from "./SearchBar";
const SideBar: FC<BookContextType & SideBarProps> = (info) => {
    const { books, matched, root, ExtraLink } = info;
    const [showMenu, setMenu] = useState(false);
    const [Nav, setNav] = useState<InnerObjectType[]>(books);
    const handlerVisibleChange = (visible: boolean | undefined) => {
        typeof visible === "boolean" ? setMenu(visible) : setMenu(!showMenu);
    };
    sidebarServer.on("toggleVisible", handlerVisibleChange);
    useUnmount(() => {
        sidebarServer.off("toggleVisible", handlerVisibleChange);
    });

    return (
        <div
            className="box-col "
            style={{
                height: "100%",
                display: showMenu ? "flex" : "none",
            }}>
            <SearchBar
                data={books}
                afterSearch={(info) => {
                    setNav(info);
                }}></SearchBar>
            <Menu
                className="no-scroll"
                defaultSelectedKeys={[matched.tag]}
                ellipsis
                style={{
                    width: "10rem",
                    contentVisibility: "auto",
                    margin: "0",
                    flex: "1",
                    overflow: "scroll",
                }}>
                <Menu.Item key="side-index">
                    <NavLink to={root}>索引</NavLink>
                </Menu.Item>
                {Nav.map((i) => {
                    const tag = Tagger.gen(i);
                    return (
                        <Menu.Item
                            className="long-list-item"
                            key={tag}
                            defaultValue={tag}>
                            <NavLink to={`${root}/${tag}`}>{i.title}</NavLink>
                        </Menu.Item>
                    );
                })}
                {ExtraLink}
            </Menu>
        </div>
    );
};
export type SideBarProps = {
    ExtraLink?: JSX.Element | JSX.Element[];
};
export function SideBarWrapper({ ExtraLink }: SideBarProps) {
    return (
        <BookContext.Consumer>
            {(info) => {
                return <SideBar {...info} ExtraLink={ExtraLink}></SideBar>;
            }}
        </BookContext.Consumer>
    );
}
