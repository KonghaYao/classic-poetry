import { Setting } from "../Setting/Setting";

type HistoryRecord = {
    time: string;
    path: string;
    endTime: string;
    name: string;
};
class HistoryCache {
    cache: HistoryRecord[] = JSON.parse(
        localStorage.getItem("__History_Cache__") || "[]"
    );
    private interval: number = 0;
    constructor() {
        this.restart();
    }
    restart() {
        this.interval = setInterval(() => this.checkState(), 15 * 1000);
        console.log("开始记录你的历史");
    }
    checkState() {
        if (this.cache[0]) {
            this.cache[0].endTime = this.timeTag();
            this.writeBack();
        }
    }
    add(name: string) {
        if (!Setting.poetry.history.enable) return false;
        const cache = {
            name,
            time: this.timeTag(),
            endTime: this.timeTag(),
            path: location.href,
        };

        if (this.cache[0]) {
            const path = cache.path.split("?")[0];
            const _path = this.cache[0].path.split("?")[0];
            if (path === _path) {
                this.cache[0].path = location.href;
                return;
            }
        }
        this.cache.unshift(cache);
        this.writeBack();
        console.log("记录路由", cache.path);
    }
    clear(start: number | "*", num: number = 1) {
        start === "*" ? (this.cache = []) : this.cache.splice(start, num);
        this.writeBack();
        clearInterval(this.interval);
    }
    private writeBack() {
        localStorage.setItem("__History_Cache__", JSON.stringify(this.cache));
    }
    timeTag() {
        return new Date().toString();
    }
}
export const History = new HistoryCache();
/** History 监控系统，请只执行一次 */
export const useHistory = () => {};
