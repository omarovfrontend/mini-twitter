const router = require('express').Router();
const { Post } = require('../db/models');

router.post('/add', async (req, res) => {
  const { postName, img } = req.body;
  console.log('===postRouter>>>', req.body);

  try {
    const newPost = await Post.create(
      {
        title: postName,
        user_id: req.session.userId,
        img,
      },
    );
    res.json({ name: req.session.name });
  } catch (error) {
    res.send('Упппссс, не вышло!');
  }
});

// ручка для удаления поста
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Post.destroy({
    where: {
      id,
    },
  });
  res.json({ isUpdatedSuccessful: true });
});

module.exports = router;
