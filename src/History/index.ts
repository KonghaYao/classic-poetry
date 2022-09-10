type HistoryRecord = {
    time: string;
    data: string;
    endTime: string;
    name: string;
};
class HistoryCache {
    cache: HistoryRecord[] = JSON.parse(
        localStorage.getItem("__History_Cache__") || "[]"
    );
    private interval;
    constructor() {
        this.interval = setInterval(() => this.checkState(), 15 * 1000);
        console.log("开始记录你的历史");
    }
    checkState() {
        this.cache[0].endTime = this.timeTag();
        this.writeBack();
    }
    add(name: string) {
        const cache = {
            name,
            time: this.timeTag(),
            endTime: this.timeTag(),
            data: location.href,
        };
        if (!this.cache[0] || cache.data !== this.cache[0].data) {
            this.cache.unshift(cache);
            this.writeBack();
            console.log("记录路由", cache.data);
        }
    }
    clear(start: number | "*", end?: number) {
        start === "*" ? (this.cache = []) : this.cache.splice(start, end);
        this.writeBack();
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
