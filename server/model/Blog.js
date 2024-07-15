import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
    },
    description:{
        type: String,
    },
    date:{
        type: Date,
        default : Date.now
    }
})

export const Blog = mongoose.model("Blog",blogSchema)