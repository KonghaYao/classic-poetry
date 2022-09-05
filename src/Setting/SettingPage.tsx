import { Button, Tabs } from "@arco-design/web-react";
import { FC, useState } from "react";
import { useMount, useUnmount } from "ahooks";
import { IconClose } from "@arco-design/web-react/icon";
import { SettingServer } from "./index";
import { SettingComponents } from "./SettingComponents";

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
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: "1000",
                display: visible ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <div
                className="content-max"
                style={{
                    width: "100%",
                    backdropFilter: "blur(8px)",
                    border: "2px solid var(--color-border)",
                    padding: "1rem",
                    borderRadius: "8px",
                    margin: "1rem",
                    height: "40%",
                }}>
                <Tabs
                    type="capsule"
                    lazyload
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
                            <Tabs.TabPane key={i.title} title={i.title}>
                                <i.comp></i.comp>
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
};
