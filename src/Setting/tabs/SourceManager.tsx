import { Button, Form, List } from "@arco-design/web-react";
import { IconBook, IconDelete, IconRefresh } from "@arco-design/web-react/icon";
import { FC, useState } from "react";
import { AsyncButton } from "../../poetry/components/AsyncButton";
import { BookStore } from "../../poetry/utils/BookStore";

export const SourceManager: FC<{}> = () => {
    let [keys, setKeys] = useState<string[]>([]);
    BookStore.store!.keys((err, keys) => {
        setKeys(keys);
    });
    return (
        <div className="box-col">
            {keys.map((item, index) => (
                <nav
                    className="box-row"
                    style={{
                        alignItems: "center",
                    }}
                    key={item}>
                    <div>
                        {/* 添加处理状态 */}
                        <AsyncButton
                            asyncClick={() => {
                                return BookStore.store!.removeItem(item);
                            }}>
                            <IconDelete></IconDelete>
                        </AsyncButton>
                        <AsyncButton
                            asyncClick={() => {
                                return BookStore.refresh(item);
                            }}>
                            <IconRefresh></IconRefresh>
                        </AsyncButton>
                    </div>
                    <IconBook></IconBook>
                    <span className="one-row" style={{ maxWidth: "50%" }}>
                        {item}
                    </span>
                    {/* <div className="flex-1"></div> */}
                </nav>
            ))}
        </div>
    );
};
