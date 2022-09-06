const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Tag = require('./Tag');
const PostTag = require('./PostTag');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Post.belongsToMany(Tag, {
  through: {
    model: PostTag,
    unique: false
  },
  as: 'post_tags',
  onDelete: 'cascade'
});

Tag.belongsToMany(Post, {
  through: {
    model: PostTag,
    unique: false
  },
  as: 'tag_post',
  onDelete: 'cascade'
});

module.exports = { User, Post, Comment, Tag, PostTag };
