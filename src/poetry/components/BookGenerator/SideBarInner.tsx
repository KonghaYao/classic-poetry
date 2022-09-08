import { Input, Menu } from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { sidebarServer } from "../../global";
import { useUnmount, useUpdateEffect } from "ahooks";
import { InnerObjectType } from "./CommonBook";
import { Tagger } from "./Tagger";
export type SideBarProps = {
    data: InnerObjectType[];
    root: string;
    ExtraLink?: JSX.Element | JSX.Element[];
};
import type FUSE from "fuse.js";
import debounce from "lodash/debounce";
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

    // 只有当 data 被第二次更新时才会重构
    useUpdateEffect(() => {
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
        <div
            className="box-col"
            style={{
                display: showMenu ? "flex" : "none",
            }}>
            <Input.Search
                placeholder="搜索导航"
                onChange={debounce((i) => searchInfo(i), 500)}
                style={{
                    width: "10rem",
                }}
            />
            <Menu
                defaultSelectedKeys={[poetryId!]}
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
                            key={"side-" + tag}
                            defaultValue={tag}>
                            <NavLink to={`${root}/${tag}`}>{i.title}</NavLink>
                        </Menu.Item>
                    );
                })}
                {ExtraLink}
            </Menu>
        </div>
    );
}
