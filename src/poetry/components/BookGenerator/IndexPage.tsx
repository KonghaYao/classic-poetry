import type { Component, JSX } from "solid-js";

export const IndexPage: Component<{
    title: string;
    children?: JSX.Element;
}> = ({ title, children }) => {
    return (
        <div class="box-col no-scroll index-page">
            <div class="box-col content-max w-full flex-1 h-full">
                <div>
                    <div class="Index-Seal leading-[1em]">{title}</div>
                </div>
                {children}
            </div>
        </div>
    );
};
