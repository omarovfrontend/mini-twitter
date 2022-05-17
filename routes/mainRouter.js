const router = require('express').Router();
const { User, Post } = require('../db/models');

router.get('/', async (req, res) => {
  let posts = await Post.findAll({
    include: [{
      model: User,
    }],
    raw: true,
  });
  console.log(posts, '===post.findAll==>>>');

  posts = posts.map((el) => ({
    ...el, owner: (el.user_id === req.session.userId),
  }));
  console.log(posts.length, '===posts.map==>>>');
  res.render('main', { posts });
});

module.exports = router;
