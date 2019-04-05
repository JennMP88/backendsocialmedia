//insert to index page
// import export
//followed list:all the people being followed?

const express = require('express');
const followerRouter = express.Router();
const FollowService = require('../services/followers');

//Read user following list
followerRouter.get('/follow/:id', (req, res, next) => {
    const {id} = req.params;

    FollowService.readfollowers(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

//read user followed list
followerRouter.get('/following/:id', (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    FollowService.readiamfollowing(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });



module.exports = followerRouter;
