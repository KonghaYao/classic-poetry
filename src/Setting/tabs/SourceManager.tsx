import { Button, Form, List } from "@arco-design/web-react";
import { IconBook, IconDelete, IconRefresh } from "@arco-design/web-react/icon";
import { FC, useState } from "react";
import { BookStore } from "../../poetry/utils/BookStore";

export const SourceManager: FC<{}> = () => {
    let [keys, setKeys] = useState<string[]>([]);
    BookStore.store!.keys((err, keys) => {
        setKeys(keys);
    });
    return (
        <div>
            <List
                style={{ width: 600 }}
                dataSource={keys}
                render={(item, index) => (
                    <List.Item
                        key={item}
                        extra={
                            <div>
                                {/* 添加处理状态 */}
                                <Button
                                    onClick={() => {
                                        BookStore.store!.removeItem(item);
                                    }}>
                                    <IconDelete></IconDelete>
                                </Button>
                                <Button
                                    onClick={() => {
                                        BookStore.refresh(item);
                                    }}>
                                    <IconRefresh></IconRefresh>
                                </Button>
                            </div>
                        }>
                        <List.Item.Meta
                            avatar={<IconBook></IconBook>}
                            title={item}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};
