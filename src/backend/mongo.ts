"use strict";
import { debounce } from "lodash";
import mongoose from "mongoose";

let cachedPromise: any = null;
const uri =
    "mongodb+srv://reader:VYKhEztiMdpWQX2A@cluster1.xavvdnu.mongodb.net/poetry?retryWrites=true&w=majority";

const close = debounce(() => {
    cachedPromise && (mongoose.disconnect(), (cachedPromise = null));
    console.log("关闭 MongoDB");
}, 5000);
export async function connectToDatabase() {
    if (!cachedPromise) {
        console.time("mongo");
        cachedPromise = mongoose.connect(uri).then(async (res) => {
            console.timeEnd("mongo");
            await import("../model/index");
            return res;
        });
    }

    // close();
    // await on the promise. This resolves only once.
    const client = await cachedPromise;
    return client;
}