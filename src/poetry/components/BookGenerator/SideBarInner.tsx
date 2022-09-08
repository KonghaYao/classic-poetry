import { Input, Menu } from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { sidebarServer } from "../../global";
import { useUnmount } from "ahooks";
import { InnerObjectType } from "./CommonBook";
import { Tagger } from "./Tagger";
export type SideBarProps = {
    data: InnerObjectType[];
    root: string;
    ExtraLink?: JSX.Element | JSX.Element[];
};
import type FUSE from "fuse.js";
function useSearch<T>(init: () => { data: T[]; options: any }) {
    const [Index, setIndex] = useState<FUSE<T> | undefined>();

    const rebuild = async () => {
        let { default: Fuse } = await import("fuse.js");

        const { data, options } = init();
        const fuse = new Fuse(data, options);

        setIndex(fuse);

        return fuse;
    };

    const searchAsync = async (text: string) => {
        const Index = await rebuild();
        return Index!.search(text);
    };
    return {
        searchAsync,
        getIndex() {
            return Index;
        },
        rebuild,
    };
}

export function SideBarInner({ data, root, ExtraLink }: SideBarProps) {
    let { poetryId } = useParams()!;
    const [showMenu, setMenu] = useState(true);

    const [Nav, setNav] = useState(data);

    const { searchAsync, getIndex, rebuild } = useSearch(function () {
        return {
            data,
            options: {
                keys: ["title"],
            },
        };
    });

    useEffect(() => {
        rebuild();
    }, [data]);

    const handlerVisibleChange = (visible: boolean | undefined) => {
        typeof visible === "boolean" ? setMenu(visible) : setMenu(!showMenu);
    };
    sidebarServer.on("toggleVisible", handlerVisibleChange);
    useUnmount(() => {
        sidebarServer.off("toggleVisible", handlerVisibleChange);
    });
    const searchInfo = async (i: string) => {
        if (i) {
            const result = getIndex()?.search(i) || (await searchAsync(i));
            setNav(result.map((i) => i.item));
        } else {
            setNav(data);
        }
    };
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
            <Input.Search
                searchButton
                placeholder="搜索导航"
                onSearch={(i) => searchInfo(i)}
            />

            <Menu.Item key="side-index">
                <NavLink to={root}>索引</NavLink>
            </Menu.Item>
            {Nav.map((i) => {
                const tag = Tagger.gen(i);
                return (
                    //  诗经中确实有重名的篇章，所以采用这种 key
                    <Menu.Item key={"side-" + tag} defaultValue={tag}>
                        <NavLink to={`${root}/${tag}`}>{i.title}</NavLink>
                    </Menu.Item>
                );
            })}
            {ExtraLink}
        </Menu>
    );
}
