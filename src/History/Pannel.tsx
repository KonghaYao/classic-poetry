import { Button, List, Trigger } from "@arco-design/web-react";
import { IconHistory } from "@arco-design/web-react/icon";
import { History } from "./index";

export const HistoryController = () => {
    return (
        <Trigger
            popup={() => <HistoryPanel />}
            alignPoint
            position="bl"
            popupAlign={{
                bottom: 8,
                left: 8,
            }}>
            <IconHistory></IconHistory>
        </Trigger>
    );
};

export const HistoryPanel = () => {
    return (
        <section className="panel">
            <div>浏览记录</div>
            <List
                style={{
                    minWidth: "15em",
                }}
                virtualListProps={{
                    height: 200,
                }}
                dataSource={History.cache}
                render={(item, index) => (
                    <List.Item key={index}>
                        <Button
                            type="secondary"
                            long
                            onClick={() => {
                                location.href = item.data;
                            }}>
                            {item.name}
                        </Button>
                    </List.Item>
                )}
            />
        </section>
    );
};
