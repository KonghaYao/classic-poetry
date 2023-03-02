import mongoose from "mongoose";

const Poetry = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    belongToName: { type: String },
    belongTo: { type: String },
    content: { type: String },
    notes: { type: String },
    id: { type: String, required: true, index: true },
});
export const _Poetry = mongoose.model("Poetry", Poetry);
