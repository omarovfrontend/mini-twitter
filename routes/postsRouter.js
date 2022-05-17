const router = require('express').Router();
const { Post } = require('../db/models');

router.post('/add', async (req, res) => {
  // const { postName, img } = req.body;
  // console.log('===postRouter>>>', req.body);

  try {
    console.log(req.body);
    // const newPost = await Post.create(
    //   {
    //     title: postName,
    //     user_id: req.session.userId,
    //     img,
    //   },
    // );
    await Post.create({ img: req.body.img, title: req.body.postName, user_id: req.session.userId });
    return res.redirect('/');
    // res.json({ name: req.session.name });
  } catch (error) {
    // res.send('Упппссс, не вышло!');
    return res.redirect('/');
  }
});

// ручка для удаления поста / через fetch
// router.delete('/delete/:id', async (req, res) => {
//   const { id } = req.params;
//   await Post.destroy({
//     where: {
//       id,
//     },
//   });
//   res.json({ isUpdatedSuccessful: true });
// });

router.get('/delete/:id', async (req, res) => {
  // console.log(req.params);
  await Post.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

module.exports = router;
