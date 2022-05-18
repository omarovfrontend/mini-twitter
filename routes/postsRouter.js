const router = require('express').Router();
const { Post } = require('../db/models');

router.post('/add', async (req, res) => {
  const { postName, img } = req.body; // получили данные из body

  try {
    const newPost = await Post.create(
      {
        title: postName,
        user_id: req.session.userId,
        img,
      },
    );
    res.json(newPost.dataValues);
  } catch (error) {
    res.send('Упппссс, ошибочка!');
  }
});

// ручка для удаления поста - через fetch
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
