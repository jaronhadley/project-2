const router = require('express').Router();
const { Tag, Post, PostTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{model: Post, through: PostTag, as: 'tag_post'} ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{model: Post, through: PostTag, as: 'tag_post'} ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const newName = req.body.tag_name;
  const postId = req.body.post_id;
  try {
    var found = 0;
    // search all tags for same
    const allData = await Tag.findAll();
    allData.forEach((tag) => {
      if(newName.toLowerCase().trim()===tag.tag_name){
        // if found get id and assign posttag
        const ptData = PostTag.create({
          tag_id: tag.id,
          post_id: postId
        });
        res.status(200).json(ptData);
        found++;
      }
    });
    if(found===0) {
      // if not found create new tag and assign posttag
      const tagData = await Tag.create(req.body);
      const ptData = await PostTag.create({
        tag_id: tagData.id,
        post_id: postId
      });
      res.status(200).json(ptData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      { tagData: req.body.tagData }
      ,{where: { id: req.params.id }}
    );

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag only removes the post tag association
router.delete('/:post_id/:tag_id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await PostTag.destroy({
      where: {
        post_id: req.params.post_id,
        tag_id: req.params.tag_id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
