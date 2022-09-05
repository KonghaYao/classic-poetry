import { PageHeader, Statistic } from "@arco-design/web-react";
import { FC } from "react";

export const PoetryHeader: FC<{
    title: string;
    subTitle?: string;
    textCount: number;
}> = (props) => {
    return (
        <PageHeader
            title={props.title}
            subTitle={props.subTitle}
            extra={
                // TODO 勘误功能
                <Statistic
                    title="字数"
                    value={props.textCount}
                    suffix="字"
                    groupSeparator
                    style={{ marginRight: 60 }}
                />
            }
        />
    );
};
