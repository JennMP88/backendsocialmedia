const { db } = require('./dbConnect');
const PostsService = {};

//register to create a new user-post
PostsService.create = (user_id, image_url, caption) => {
  const number_of_comments = 0;
  const sql = `INSERT INTO posts (user_id, image_url,caption,number_of_comments) VALUES ($[user_id], $[image_url], $[caption],$[number_of_comments])`;
  // console.log(username)
  return db.none(sql, { user_id, image_url, caption, number_of_comments });
}

//POST page reads a post 
PostsService.read = (id) => {
  const sql = ` SELECT users.username, users.avatar, posts.number_of_comments,posts.image_url, posts.caption, COUNT(likes.post_id) as number_of_likes
FROM posts
JOIN users ON users.id = posts.user_id
LEFT JOIN likes ON likes.post_id=posts.id
WHERE posts.id= $[id]
GROUP BY users.username, users.avatar, posts.number_of_comments,posts.image_url, posts.caption`
  return db.any(sql, { id })
};

//bottom part to view post page 
PostsService.readPost2 = (id) => {
  const sql = `SELECT users.username,comments.texts,users.avatar
FROM comments
	JOIN users ON users.id=comments.user_id
  WHERE comments.post_id=$[id]`
  return db.any(sql, { id })
};


PostsService.read = (id) => {
  const sql = ` SELECT comments.id, post.id, COUNT(comments.post_id) as comment posts
  FROM posts
  JOIN comments ON comments.post_id = posts.id
  WHERE posts.id= $[id]
  GROUP BY comments.id, post.id, COUNT(comments.post_id)`
  return db.any(sql, { id })
};

//just to count the counts from posts
PostsService.readPost2 = (id) => {
  const sql =
    `UPDATE posts 
  SET 
  posts.id =$[id], count(posts.id) 
	FROM posts 
	JOIN comments ON posts.id = comments.post_id 
	WHERE posts.id= $[id]
  GROUP BY posts.id`


  return db.any(sql, { id })
};


module.exports = PostsService;