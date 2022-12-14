const router = require('express').Router();
const {
  Post,
  User,
  Comment,
  Tag,
  PostTag,
  Vote,
  Follower,
} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'contents',
        'date_created',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ),
          'vote_count',
        ],
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
        {
          model: Tag,
          through: PostTag,
          as: 'post_tags',
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    posts.forEach((post) => {
      if (post.contents.length > 450) {
        post.contents = post.contents.slice(0, 450) + ' ...';
      }
    });
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// for upvoted posts
router.get('/recommended', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'contents',
        'date_created',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ),
          'vote_count',
        ],
      ],
      order: [['vote_count', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
        {
          model: Tag,
          through: PostTag,
          as: 'post_tags',
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    posts.forEach((post) => {
      if (post.contents.length > 450) {
        post.contents = post.contents.slice(0, 450) + ' ...';
      }
    });
    // Pass serialized data and session flag into template
    res.render('recommended-posts', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// render specific post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'contents',
        'date_created',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
          ),
          'vote_count',
        ],
      ],
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
        {
          model: Tag,
          through: PostTag,
          as: 'post_tags',
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      logged_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// render personal user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }, { model: Comment }, { model: Vote}],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard'); // route to personal dash if logged in
    return;
  }

  res.render('login');
});
// render page that allows the post to be updated.
router.get('/post/update/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
        {
          model: Tag,
          through: PostTag,
          as: 'post_tags',
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('update', {
      ...post,
      logged_in: req.session.logged_in,
      logged_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// render profile page of specific user
router.get('/profile/:name', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { name: req.params.name },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
        },
        {
          model: Comment,
        },
        
      ],
    });

    const user = userData.get({ plain: true });
console.log(user)
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
      logged_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// render user's personal profile update page
router.get('/dashboard_update/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    res.render('dashboard_update', {
      ...user,
      logged_in: req.session.logged_in,
      logged_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/following', withAuth, async (req, res) => {
  try {
    const followList = await Follower.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          as: 'following',
        }
      ],
    });
    const follow = followList.map((followers) =>
      followers.get({ plain: true })
    );
   
    res.render('follow', {
      follow,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/profile/:name/follow', withAuth, async (req, res) => {
  try {
    const followerData = await Follower.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(followerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;