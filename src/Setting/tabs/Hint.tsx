import { Tooltip } from "@arco-design/web-react";
import { FC } from "react";
import { IconExclamationCircle } from "@arco-design/web-react/icon";

export const Hint: FC<{
    message: string;
}> = ({ message }) => {
    return (
        <Tooltip content={message}>
            <span
                style={{
                    margin: "2rem",
                }}>
                <IconExclamationCircle />
            </span>
        </Tooltip>
    );
};
