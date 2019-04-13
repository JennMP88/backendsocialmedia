const express = require('express');
const postsRouter = express.Router();
const PostsService = require('../services/posts');

// POST - SPECIFIC  USER CREATEs a post 
postsRouter.post('/new', (req, res, next) => {
  const { user_id, image_url, caption  } = req.body;
  console.log(req.body)

  PostsService.create(user_id, image_url, caption)
    .then(data => {
      res.json({ success: `${user_id} created a post.` });
    })
    .catch(err => {
      console.log(err)
      next(err);
    })
});


// POST page reads a post
postsRouter.get('/posts/:id', (req, res, next) => {
  const { id } = req.params;
  //  console.log(req.params)
  PostsService.read(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

//bottom part to view post page
postsRouter.get('/post/:id', (req, res, next) => {
  const { id } = req.params;
  // console.log(req.body)

  PostsService.readPost2(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

//just to count the counts for post 
postsRouter.get('/count/:id', (req, res, next) => {
  const { id } = req.params;
  // console.log(req.body)

  PostsService.readPost2(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = postsRouter;