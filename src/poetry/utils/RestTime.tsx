export const RestTime = () =>
    new Promise((res) => {
        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => {
                res(null);
            });
        } else {
            setTimeout(() => res(null), 5000);
        }
    });
