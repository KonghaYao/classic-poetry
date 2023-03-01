import type React from "react";
import type { FC } from "react";

export const IndexPage: FC<{
    title: string;
    children?: React.ReactNode;
}> = ({ title, children }) => {
    return (
        <div className="box-col no-scroll index-page">
            <div
                className="box-col content-max"
                style={{
                    height: "100%",
                    flex: "1",
                }}>
                <div>
                    <div className="Index-Seal leading-[1em]">{title}</div>
                </div>
                <div className="box-col no-scroll link-list">{children}</div>
            </div>
        </div>
    );
};
