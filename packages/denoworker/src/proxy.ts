/** 复制头部 */
const cloneHeaders = (headers: Headers) => {
    const newHeader = new Headers();
    for (let i of headers.entries()) {
        newHeader.append(...i);
    }
    return newHeader;
};
/** 重写请求头部信息 */
const ReqHeadersRewrite = (req: Request, Url: URL) => {
    const newH = cloneHeaders(req.headers);
    newH.delete("X-deno-transparent");
    // 重写 referer 和 origin 保证能够获取到数据
    newH.set("referer", Url.toString());
    newH.set("origin", Url.toString());
    return newH;
};
/** 重写结果头部 */
const ResHeadersReWrite = (res: Response, domain: string) => {
    const newHeader = cloneHeaders(res.headers);
    newHeader.set("access-control-allow-origin", "*");
    const cookie = newHeader.get("set-cookie");
    cookie &&
        newHeader.set(
            "set-cookie",
            cookie.replace(/domain=(.+?);/, `domain=${domain};`)
        );
    newHeader.delete("X-Frame-Options"); // 防止不准 iframe 嵌套
    return newHeader;
};
/** 代理整个路径后面的请求，包括所有请求模式
 * @example 
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createServer,proxy } from "https://esm.sh/deno-server@1.0.0";

serve((req: Request) => proxy('google.com',req));
 */
export const proxy = (host: string, req: Request) => {
    // const Url = getTransparentURL(req);
    const Url = new URL(req.url);
    Url.host = host;
    if (Url instanceof Response) return Url;
    // console.log(Url.toString());

    const newH = ReqHeadersRewrite(req, Url);
    return fetch(Url, {
        headers: newH,
        method: req.method,
        // 所有 body 将会转交，故没啥兼容问题
        body: req.body,
        redirect: req.redirect,
    }).then((res) => {
        const newHeader = ResHeadersReWrite(res, new URL(req.url).host);
        const config = {
            status: res.status,
            statusText: res.statusText,
            headers: newHeader,
        };
        console.log(res.status, res.url);
        // 维持重定向,304 Not Modify 不需要重定向
        if (res.status >= 300 && res.status < 400 && res.status !== 304) {
            console.log(res.status, "重定向至", req.url);
            return Response.redirect(req.url, res.status);
        }
        return new Response(res.body, config);
    });
};
