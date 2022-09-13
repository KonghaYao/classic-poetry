import { Avatar } from "@arco-design/web-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const data = [
    {
        name: "字体支持",
        avatar: "/avatar.png",
        description: [
            "字体支持是由江夏尧的中文 Web Font 项目进行支持的",
            "《中华诗词大典》中的默认字体采用江西拙楷、思源宋体和汇源明朝体",
            "其他提供的字体可在 Web Font 字库中查看，感谢字体支持。",
        ],
        link: "https://chinese-font.netlify.app/#/home",
        bg: "https://images.unsplash.com/photo-1589895009255-67c7cb06de4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    },
    {
        name: "江夏尧",
        avatar: "/avatar.png",
        link: "https://github.com/KonghaYao/classic-poetry",
        bg: "https://images.unsplash.com/photo-1604844252839-f9c364adacdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
        description: [
            "辛苦的《中华诗词大典》工程师。",
            "他规范化了中文诗歌仓库的数据，",
            "并花费了巨大精力对整个 APP 进行设计。",
            "《中华诗词大典》 Github 仓库地址在下面！",
        ],
    },
    {
        name: "中文诗歌",
        avatar: "/origin.png",
        description: [
            "这个是最全的中华古诗词数据库,",
            " 收集了唐宋两朝近一万四千古诗人,",
            "接近5.5万首唐诗加26万宋诗。",
            "两宋时期1564位词人，21050首词。",
            "这个仓库是《中华诗词大典》的数据来源。",
        ],
        link: "https://github.com/chinese-poetry/chinese-poetry",
        bg: "https://images.unsplash.com/photo-1603258745801-42037f02831c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },

    {
        name: "图片支持",
        avatar: "https://unsplash.com/safari-pinned-tab.svg",
        description: [
            "这个页面中的图片是下面的摄影师在 unsplash 中提供的，感谢",
            <a href="https://unsplash.com/@furicz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Zixi Zhou
            </a>,
            <a href="https://unsplash.com/@kaiyu_wu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Kaiyu Wu
            </a>,
            <a href="https://unsplash.com/@zhangkaiyv?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                zhang kaiyv
            </a>,
            <a href="https://unsplash.com/@chenwei17?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                chenwei wang
            </a>,
        ],
        bg: "https://images.unsplash.com/photo-1643375081193-9225f9f1e859?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        link: "https://unsplash.com/",
    },
];

import "./index.css";
export const Contribute: FC = () => {
    return (
        <div className="box box-row">
            {data.map((i, index) => {
                return (
                    <div
                        className="contribute-one box-col"
                        key={"contribute" + index}>
                        <nav className="absolute-bg box-center">
                            <img src={i.bg} alt="" />
                        </nav>
                        <main className="content box box-col">
                            <header>
                                <Avatar shape="square">
                                    <img src={i.avatar} alt="" />
                                </Avatar>
                            </header>
                            <div className="name">{i.name}</div>
                            <div className="description box-col ">
                                {i.description.map((words, index) => {
                                    return (
                                        <div key={"words-" + index}>
                                            {words}
                                        </div>
                                    );
                                })}
                            </div>
                            <a className="link" target="_blank" href={i.link}>
                                链接
                            </a>
                        </main>
                    </div>
                );
            })}
        </div>
    );
};
