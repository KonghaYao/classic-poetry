import {
    Avatar,
    Divider,
    Space,
    Tooltip,
    Trigger,
} from "@arco-design/web-react";
import { FC } from "react";
import { useServer } from "..";

const DetailPanel: FC = () => {
    return (
        <Space
            direction="vertical"
            className="panel"
            style={{
                textAlign: "center",
                userSelect: "none",
                padding: "1rem",
                border: "1px solid var(--color-text-4)",
                borderRadius: "12px",
            }}>
            <div
                style={{
                    fontSize: "1.125rem",
                }}>
                江夏尧
            </div>
            <span
                style={{
                    fontSize: "0.7rem",
                }}>
                辛苦劳累的网站作者
            </span>
            <span>》===感谢列表===《</span>
            <Space size="medium">
                <a
                    href="https://github.com/chinese-poetry/chinese-poetry"
                    target="_blank">
                    <Avatar shape="square">
                        <img alt="avatar" src="/origin.png" />
                    </Avatar>
                    <span>中文诗歌数据仓库</span>
                </a>
            </Space>
        </Space>
    );
};
const component = () => {
    return (
        <Trigger
            popupAlign={{
                bottom: 8,
            }}
            position="bl"
            popup={() => <DetailPanel></DetailPanel>}>
            <a
                href="https://github.com/KonghaYao/classic-poetry"
                target="_blank">
                <Avatar size={32}>
                    <img alt="avatar" src="/avatar.png" />
                </Avatar>
            </a>
        </Trigger>
    );
};
export const applyAuthor = () => {
    useServer().register({
        id: "author-avatar",
        position: "header-right",
        component,
    });
};
