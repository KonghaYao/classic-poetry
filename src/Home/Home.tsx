import type { FC } from "react";
import "./Home.css";
import { SubRoutes } from "./subRoutes";
export const Home: FC = () => {
    const data = SubRoutes.reverse();

    return (
        <section className="home-page  noise no-scroll">
            <main className="book-list box-col ">
                <div className="book-item-wrapper box-row">
                    {data.map((i) => {
                        return (
                            <div
                                className="book-item box-row p-1"
                                key={i.to}
                                // onclick 能够防止点击之后立即跳转的情况
                                onClick={() => {
                                    console.log(i.to);
                                    location.href = "/book" + i.to;
                                }}>
                                <div className="book-link">{i.name}</div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <header className="noise book-header-wrapper">
                <div className="book-header leading-[1em]">中华诗词大典</div>
            </header>
        </section>
    );
};
