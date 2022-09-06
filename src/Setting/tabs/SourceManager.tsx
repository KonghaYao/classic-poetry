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
        <div>
            <List
                dataSource={keys}
                render={(item, index) => (
                    <List.Item
                        key={item}
                        extra={
                            <div>
                                {/* 添加处理状态 */}
                                <AsyncButton
                                    asyncClick={() => {
                                        return BookStore.store!.removeItem(
                                            item
                                        );
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
