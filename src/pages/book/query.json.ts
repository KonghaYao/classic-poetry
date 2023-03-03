import type { APIRoute } from "astro";
import { connectToDatabase } from "../../backend/mongo";
// import { _Poetry } from "../../model";
export const get: APIRoute = async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    if (!params.name) {
        return new Response("{}", {
            status: 404,
        });
    }
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 30;
    // console.log(
    //     await import.meta.resolve(
    //         `../../../data/indexes/${params.name}.json`,
    //         import.meta.url
    //     )
    // );
    // 上传至 mongoDB 主机, 注意，并不会跟随 Docker 打包
    const data = await connectToDatabase().then(async (db) => {
        const data = await db.models.Poetry.find(
            { belongToName: params.name },
            { content: 0, notes: 0 }
        )
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();
        return data;
    });
    return {
        body: JSON.stringify({
            data,
            total: data.length,
            next: data.length === limit ? page + 1 : null,
        }),
    };
};
