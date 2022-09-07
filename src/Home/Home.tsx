import { Card, Grid } from "@arco-design/web-react";
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
    ].reverse();
    return (
        <section className="home-page box-row noise">
            <nav className="book-list box-row">
                {data.map((i) => {
                    return (
                        <div className="book-item box-row" key={i.to}>
                            <div className="void-circle"></div>

                            <NavLink to={i.to}>{i.name}</NavLink>
                        </div>
                    );
                })}
            </nav>

            <header className="noise book-header-wrapper">
                <div className="book-header">中华诗词大典</div>
            </header>
        </section>
    );
};
