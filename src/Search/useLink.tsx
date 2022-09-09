export const useLink = (url: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("link");
        script.rel = "stylesheet";
        script.href = url;
        script.onload = () => {
            resolve(null);
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
