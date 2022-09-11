import { Avatar, Tooltip } from "@arco-design/web-react";
import { useServer } from "..";

const component = () => {
    return (
        <Tooltip content="这个是辛苦劳累的作者">
            <a
                href="https://github.com/KonghaYao/classic-poetry"
                target="_blank">
                <Avatar size={32}>
                    <img alt="avatar" src="/avatar.png" />
                </Avatar>
            </a>
        </Tooltip>
    );
};
export const applyAuthor = () => {
    useServer().register({
        id: "author-avatar",
        position: "header-right",
        component,
    });
};
