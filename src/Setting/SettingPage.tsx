import { Button, Tabs } from "@arco-design/web-react";
import { FC } from "react";
import { IconClose } from "@arco-design/web-react/icon";
import { SettingComponents } from "./SettingComponents";
import "./Setting.css";
import { SettingServer } from "./Setting";
export const SettingPage: FC<{}> = () => {
    return (
        <div class="setting-screen">
            <div class="content-max setting-card box-col">
                <Tabs
                    type="capsule"
                    class="setting-content box-col"
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
                                class="box-col setting-content"
                                key={i.title}
                                title={i.title}>
                                <i.comp></i.comp>
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
};
