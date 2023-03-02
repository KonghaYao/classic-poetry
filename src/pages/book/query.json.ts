import type { APIRoute } from "astro";
import mongoose from "mongoose";
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
    const page = params.pageSize ? parseInt(params.pageSize) : 1;
    const limit = params.limit ? parseInt(params.limit) : 20;
    // console.log(
    //     await import.meta.resolve(
    //         `../../../data/indexes/${params.name}.json`,
    //         import.meta.url
    //     )
    // );
    // 上传至 mongoDB 主机, 注意，并不会跟随 Docker 打包
    const data = await mongoose
        .connect(
            "mongodb+srv://reader:JqdKie3Zz7bKAxPz@cluster1.xavvdnu.mongodb.net/poetry?retryWrites=true&w=majority"
        )
        .then(async (db) => {
            console.log("连接成功");
            const data = await db.models.Poetry.find(
                { belongToName: params.name },
                { content: 0, notes: 0 }
            )
                .skip(page)
                .limit(limit)
                .lean(true)
                .exec();
            console.log("返回成功");
            mongoose.disconnect();
            return data;
        });

    return {
        body: JSON.stringify({
            data,
            total: data.length,
        }),
    };
};
