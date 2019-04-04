const {db} = require('./dbConnect');
const CommentsService = {};

//create a new comment
CommentsService.create = (post_id,user_id,texts) => {
  const sql = "INSERT INTO comments (post_id,user_id,texts) VALUES (${post_id}, ${user_id}, ${texts})";

  return db.none(sql, {post_id,user_id,texts});
}

CommentsService.read= (id) => {
    const sql = `
   SELECT *
   FROM comments
   WHERE id= ${id} `
    return db.any(sql, {id});
  }

module.exports = CommentsService;