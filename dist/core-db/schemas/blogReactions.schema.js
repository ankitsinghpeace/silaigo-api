"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogReactionSchema = exports.BlogReactionType = void 0;
const mongoose = require('mongoose');
var BlogReactionType;
(function (BlogReactionType) {
    BlogReactionType["LIKE"] = "like";
    BlogReactionType["DISLIKE"] = "dislike";
    BlogReactionType["LOVE"] = "love";
    BlogReactionType["LAUGH"] = "laugh";
    BlogReactionType["ANGRY"] = "angry";
    BlogReactionType["SAD"] = "sad";
})(BlogReactionType || (exports.BlogReactionType = BlogReactionType = {}));
exports.BlogReactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(BlogReactionType),
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
}, {
    timestamps: true
});
exports.BlogReactionSchema.index({ user: 1, blog: 1 }, { unique: true });
exports.BlogReactionSchema.index({ blog: 1, type: 1 });
const BlogReaction = mongoose.model('BlogReaction', exports.BlogReactionSchema);
//# sourceMappingURL=blogReactions.schema.js.map