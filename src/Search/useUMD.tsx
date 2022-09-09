export const useUMD = (url: string, name: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => {
            resolve((globalThis as any)[name]);
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
