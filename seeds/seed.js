const sequelize = require('../config/connection');
const { User, Post, Comment, Tag, PostTag } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const tagData = require('./tagData.json');
const postTagData = require('./postTagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    const posts = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  await Tag.bulkCreate(tagData);

  await PostTag.bulkCreate(postTagData);

  process.exit(0);
};

seedDatabase();
