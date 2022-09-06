import { Button, ButtonProps } from "@arco-design/web-react";
import { omit } from "lodash-es";
import { FC, useState } from "react";

export const AsyncButton: FC<
    {
        asyncClick: () => Promise<any>;
    } & ButtonProps
> = (props) => {
    const [loading, setLoading] = useState(false);
    return (
        <Button
            {...omit(props, ["loading", "asyncClick", "onClick"])}
            loading={loading}
            onClick={() => {
                setLoading(true);
                props.asyncClick().then(() => {
                    setLoading(false);
                });
            }}></Button>
    );
};
