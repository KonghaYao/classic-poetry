import localforage from "localforage";
import { Setting } from "../../Setting";
localforage.setDriver(localforage.LOCALSTORAGE);
export const BookStore = {
    version: "",
    store: undefined as undefined | typeof localforage,
    ready: Promise.resolve(false).then(async () => {
        BookStore.version = await getVersion();
        const versionNumber = getNumberVersion(BookStore.version);
        BookStore.store = localforage.createInstance({
            name: "book-store",
            version: versionNumber,
        });
        return true;
    }),
    /** 不要直接使用，使用 getBook 直接获取 */
    async fetchData(path: string) {
        return fetch(Setting.poetry.root + path).then((res) => res.json());
    },
    async refresh(path: string) {
        const data = await this.fetchData(path);
        this.store!.setItem(path, data); // 不进行等待
        return data;
    },

    /** path 为仓库下的地址 */
    async getBook<T>(path: string): Promise<T> {
        return this.ready
            .then(() => {
                return this.store!.getItem<Object>(path);
            })
            .then(async (res) => {
                if (res) {
                    return res;
                } else {
                    return this.refresh(path);
                }
            });
    },
};

/** 将 1.4.1 分配为 001004001 这个数字 */
function getNumberVersion(version: string) {
    return parseInt(
        version
            .split(".")
            .map((i) => {
                const num = parseInt(i);
                return num < 10 ? "00" + num : num < 100 ? "0" + num : num;
            })
            .join("")
    );
}

/** 从 localStorage 中获取 version 字段，如果没有，那么将会请求版本号，并获取最新的版本 */
async function getVersion() {
    let bookStoreVersion = localStorage.getItem("book-store-version");
    if (!bookStoreVersion) {
        const { versions } = await fetch(
            "https://data.jsdelivr.com/v1/package/npm/chinese-poetry"
        ).then((res) => res.json());
        bookStoreVersion = versions[0];
    }
    return bookStoreVersion!;
}
