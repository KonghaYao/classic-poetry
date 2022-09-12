import { FC } from "react";

/** 显示脚注的组件 */
export const NotsShower: FC<{ notes: string[] }> = ({ notes }) => {
    return (
        <>
            <div>
                {notes.map((i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                fontSize: "0.75em",
                            }}>
                            {i}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
