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
        { name: "花间集", to: "/huajianji" },
        { name: "南唐二主词", to: "/nantang" },
        { name: "纳兰性德诗集", to: "/nalanxingde" },
        { name: "蒙学", to: "/mengxue" },
        { name: "幼学琼林", to: "/youxueqionglin" },
        { name: "弟子规", to: "/dizigui" },
        { name: "千家诗", to: "/qianjiashi" },
        { name: "古文观止", to: "/guwenguanzhi" },
        { name: "唐诗三百首", to: "/tangshisanbaishou" },
    ].reverse();
    return (
        <section className="home-page box-row noise">
            <nav className="book-list box-row">
                {data.map((i) => {
                    return (
                        <NavLink className="book-item box-row" to={i.to}>
                            <div className="book-link" key={i.to}>
                                {i.name}
                            </div>{" "}
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
