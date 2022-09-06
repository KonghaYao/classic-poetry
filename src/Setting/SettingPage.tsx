import { Button, Tabs } from "@arco-design/web-react";
import { FC, useState } from "react";
import { useMount, useUnmount } from "ahooks";
import { IconClose } from "@arco-design/web-react/icon";
import { SettingServer } from "./index";
import { SettingComponents } from "./SettingComponents";
import "./Setting.css";
export const SettingPage: FC<{}> = () => {
    const [visible, setVisible] = useState(false);

    const changeVisible = (vis: boolean | undefined) => {
        typeof vis === "boolean" ? setVisible(vis) : setVisible(!visible);
    };
    useMount(() => {
        SettingServer.on("toggle", changeVisible);
    });
    useUnmount(() => {
        SettingServer.off("toggle", changeVisible);
    });

    return (
        <div
            className="setting-screen"
            style={{
                display: visible ? "flex" : "none",
            }}>
            <div className="content-max setting-card box-col">
                <Tabs
                    type="capsule"
                    className="setting-content box-col"
                    lazyload
                    style={{
                        height: "100%",
                        overflow: "hidden",
                    }}
                    extra={
                        <Button
                            type="secondary"
                            onClick={() => {
                                SettingServer.emit("toggle", false);
                            }}>
                            <IconClose></IconClose>
                        </Button>
                    }>
                    {SettingComponents.map((i) => {
                        return (
                            <Tabs.TabPane
                                className="box-col setting-content"
                                key={i.title}
                                title={i.title}>
                                <div
                                    style={{
                                        margin: "1.5rem ",
                                    }}>
                                    <i.comp></i.comp>
                                </div>
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
};
