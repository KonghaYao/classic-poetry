import { FC } from "react";
import { BookStore } from "../utils/BookStore";
import { CommonBook, IndexPageOrigin } from "../components/BookGenerator";
import { Grid, Menu } from "@arco-design/web-react";
import { NavLink } from "react-router-dom";

type SingleData = { chapter: string; paragraphs: string[] };
export type FetchData = SingleData[];

const info = {
    title: "四书五经",
    root: "/sishuwujing",
    adapter(i: SingleData) {
        return { title: i.chapter, content: i.paragraphs };
    },
    async getData() {
        const pre = "sishuwujing/";
        const data = ["daxue.json", "zhongyong.json", "mengzi.json"].map((i) =>
            BookStore.getBook<FetchData>(pre + i)
        );

        return Promise.all(data).then((res) => res.flat()); // 这里 data 直接 any 即可
    },
};
const ExtraLink = [
    {
        title: "论语",
        to: "/lunyu",
    },
];
export const SiShuWuJing: FC = () => {
    return (
        <CommonBook
            ExtraLink={ExtraLink.map((i) => {
                return (
                    <Menu.Item key={i.title}>
                        <NavLink to={i.to}>{i.title}</NavLink>
                    </Menu.Item>
                );
            })}
            {...info}></CommonBook>
    );
};

export const SiShuWuJingIndex: FC = () => {
    return (
        <IndexPageOrigin
            {...info}
            ExtraLink={ExtraLink.map((i) => {
                return (
                    <Grid.Col
                        span={12}
                        key={i.to}
                        style={{
                            textAlign: "center",
                        }}>
                        <NavLink
                            to={i.to}
                            style={{
                                fontSize: "1.125rem",
                            }}>
                            {i.title}
                        </NavLink>
                    </Grid.Col>
                );
            })}></IndexPageOrigin>
    );
};
