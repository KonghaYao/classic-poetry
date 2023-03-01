import type { APIRoute } from "astro";
import fs from "fs";

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
    const file = await fs.promises.readFile(
        `./data/indexes/${params.name}.json`,
        "utf-8"
    );
    const data: { id: string; title: string }[] = JSON.parse(file).slice(
        (page - 1) * limit,
        page * limit
    );
    return {
        body: JSON.stringify({
            data,
            total: data.length,
        }),
    };
};
