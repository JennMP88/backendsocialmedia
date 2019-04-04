const express = require('express');
const commentsRouter = express.Router();
const CommentsService = require('../services/comments');

// COMMENT - SPECIFIC  USER CREATEs a post 
commentsRouter.post('/comment', (req, res, next) => {
  const {post_id,user_id,texts} = req.body;
  //   const {id} = req.params;
    // console.log(req.body)

CommentsService.create(post_id,user_id,texts)
    .then(data => {
      res.json({success: `${user_id} created a comment.`});
    })
    .catch(err => {
      next(err);
    })
});


// COMMENT page reads a comment
commentsRouter.get('/comment/:id', (req, res, next) => {
  const {id} = req.params;
  
  CommentsService.read(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = commentsRouter;