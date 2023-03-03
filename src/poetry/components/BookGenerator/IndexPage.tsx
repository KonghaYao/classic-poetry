import type React from "react";
import type { FC } from "react";

export const IndexPage: FC<{
    title: string;
    children?: React.ReactNode;
}> = ({ title, children }) => {
    return (
        <div className="box-col no-scroll index-page">
            <div className="box-col content-max w-full flex-1 h-full">
                <div>
                    <div className="Index-Seal leading-[1em]">{title}</div>
                </div>
                {children}
            </div>
        </div>
    );
};
