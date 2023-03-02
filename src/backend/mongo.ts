"use strict";
import { debounce } from "lodash";
import mongoose from "mongoose";

let cachedPromise: any = null;
const uri =
    "mongodb+srv://reader:JqdKie3Zz7bKAxPz@cluster1.xavvdnu.mongodb.net/poetry?retryWrites=true&w=majority";

const close = debounce(() => {
    cachedPromise && (mongoose.disconnect(), (cachedPromise = null));
    console.log("结束战斗");
}, 5000);
export async function connectToDatabase() {
    if (!cachedPromise) {
        cachedPromise = mongoose.connect(uri);
    }

    close();
    // await on the promise. This resolves only once.
    const client = await cachedPromise;
    console.log("申请使用");
    await import("../model/index");
    return client;
}
