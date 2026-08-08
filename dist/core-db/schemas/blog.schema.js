"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = void 0;
const mongoose = require('mongoose');
exports.BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogReaction'
        }],
    isPublished: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
const Blog = mongoose.model('Blog', exports.BlogSchema);
//# sourceMappingURL=blog.schema.js.map