import { Schema, model } from "mongoose";

const urlSchema = new Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
});

export default model("Url", urlSchema);
