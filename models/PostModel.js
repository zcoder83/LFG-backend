// import mongoose to create new Schema
const mongoose = require("mongoose");

// create Schema
const PostItemSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    date: { type: Date, default: Date.now },
    discord: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// export the schema
module.exports = mongoose.model("post", PostItemSchema);
