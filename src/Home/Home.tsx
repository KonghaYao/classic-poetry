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
    ];
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

            <header className="book-header noise">中华诗词大典</header>
        </section>
    );
};
