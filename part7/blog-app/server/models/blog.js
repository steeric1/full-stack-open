const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            content: { type: String },
        },
    ],
});

blogSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.comments = returnedObject.comments.map((comment) => {
            let copy = { ...comment };
            copy.id = copy._id.toString();
            delete copy._id;
            return copy;
        });
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);
