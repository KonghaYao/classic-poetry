import type { FC } from "react";
import "./Home.css";
import { SubRoutes } from "./subRoutes";
export const Home: FC = () => {
    const data = SubRoutes.reverse();

    return (
        <section class="home-page  noise no-scroll">
            <main class="book-list box-col ">
                <div class="book-item-wrapper box-row">
                    {data.map((i) => {
                        return (
                            <div
                                class="book-item box-row p-1"
                                key={i.to}
                                // onclick 能够防止点击之后立即跳转的情况
                                onClick={() => {
                                    console.log(i.to);
                                    location.href = "/book" + i.to;
                                }}>
                                <div class="book-link">{i.name}</div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <header class="noise book-header-wrapper">
                <div class="book-header leading-[1em]">中华诗词大典</div>
            </header>
        </section>
    );
};
