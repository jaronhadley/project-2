const router = require('express').Router();
const { Post, Tag, PostTag } = require('../../models');
const withAuth = require('../../utils/auth');

// create post
router.post('/', withAuth, async (req, res) => {
  const words = req.body.contents.split(' ');
  const tags = [];
  words.forEach((word) => {
    if(word[0]==='#') {
      tags.push(word.slice(1));
    }
  })
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    const post = await newPost.get({ plain: true })
    if (post) {
      if(tags.length>0){
        tags.forEach(async (tag) => {
          const allData = await Tag.findAll({where:{tag_name: tag.toLowerCase().trim()}});
          console.log(allData)
          if(allData.length > 0) {
            console.log(allData[0].dataValues);
            const ptData = PostTag.create({
              tag_id: allData[0].dataValues.id,
              post_id: post.id
            });
          } else {
            const tagData = await Tag.create({tag_name:tag});
            const ptData = await PostTag.create({
              tag_id: tagData.id,
              post_id: post.id
            });
          }
        })
      }
      res.status(200).json(newPost);
    }
    
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      { ...req.body, user_id: req.session.user_id },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
