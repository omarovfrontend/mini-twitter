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

// ручка для изменения поста
router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      postName, img,
    } = req.body;

    await Post.update({
      title: postName, img, user_id: req.session.userId,
    }, { where: { id } });
    const testPost = await Post.findByPk(id);
    res.json(testPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
