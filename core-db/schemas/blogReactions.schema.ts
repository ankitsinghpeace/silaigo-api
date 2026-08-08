const mongoose = require('mongoose');

export enum BlogReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  LOVE = 'love',
  LAUGH = 'laugh',
  ANGRY = 'angry',
  SAD = 'sad'
}

export const BlogReactionSchema = new mongoose.Schema({
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

BlogReactionSchema.index({ user: 1, blog: 1 }, { unique: true });


BlogReactionSchema.index({ blog: 1, type: 1 });


 const BlogReaction = mongoose.model('BlogReaction', BlogReactionSchema)