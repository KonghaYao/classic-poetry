import type { APIRoute } from "astro";
import { db } from "../../backend/pg";
// import { _Poetry } from "../../model";
export const get: APIRoute = async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    if (!params.text) {
        return new Response("{}", {
            status: 404,
        });
    }
    const text = params.text;
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 30;
    // console.log(
    //     await import.meta.resolve(
    //         `../../../data/indexes/${params.name}.json`,
    //         import.meta.url
    //     )
    // );
    // 上传至 mongoDB 主机, 注意，并不会跟随 Docker 打包
    const data = await db().then(async (db) => {
        return db.query(
            `select id,_id,title,"subTitle","belongToName" from poetries where "belongToName" = '${text}' limit ${limit} offset ${
                page * limit
            }`
        );
    });
    return {
        body: JSON.stringify({
            data: data.rows,
            count: data.rowCount,
        }),
    };
};
