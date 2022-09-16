const cache = new Set();
export const useUMD = async (url: string, name: string) => {
    if (cache.has(url)) return;

    return new Promise((resolve, reject) => {
        cache.add(url);
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => {
            resolve((globalThis as any)[name]);
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
