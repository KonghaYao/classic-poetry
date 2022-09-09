import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
export const Home: FC = () => {
    const data = [
        {
            name: "论语",
            to: "/lunyu",
        },
        {
            name: "诗经",
            to: "/shijing",
        },
        { name: "四书五经", to: "/sishuwujing" },
        { name: "楚辞", to: "/chuci" },
        { name: "花间集", to: "/huajianji" },
        { name: "蒙学", to: "/mengxue" },
        { name: "幼学琼林", to: "/youxueqionglin" },
        { name: "弟子规", to: "/dizigui" },
        { name: "千家诗", to: "/qianjiashi" },
        { name: "南唐二主词", to: "/nantang" },
        { name: "古文观止", to: "/guwenguanzhi" },
        { name: "唐诗三百首", to: "/tangshisanbaishou" },
        { name: "全唐诗集", to: "/tang" },
        { name: "全宋词集", to: "/song" },
        // TODO 元曲的个数太大了，所以暂时不采用
        // { name: "元曲", to: "/yuanqu" },
        { name: "曹操诗集", to: "/caocaoshiji" },
        { name: "纳兰性德诗集", to: "/nalanxingde" },
    ].reverse();
    return (
        <section className="home-page box-row noise">
            <nav className="book-list box-row">
                {data.map((i, index) => {
                    return (
                        <NavLink
                            className="book-item box-row"
                            to={i.to}
                            key={i.to}>
                            <div className="book-link">{i.name}</div>
                        </NavLink>
                    );
                })}
            </nav>

            <header className="noise book-header-wrapper">
                <div className="book-header">中华诗词大典</div>
            </header>
        </section>
    );
};
