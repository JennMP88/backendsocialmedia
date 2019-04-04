DROP DATABASE IF EXISTS socialmedia;
CREATE DATABASE socialmedia;

\c socialmedia;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR NOT NULL, --unique
named VARCHAR NOT NULL,
email VARCHAR NOT NULL,    --unique
avatar VARCHAR );   --the attachment?

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) NOT NULL,
image_url VARCHAR NOT NULL,
caption VARCHAR NOT NULL,
title VARCHAR NOT NULL,
number_of_comments  INT NOT NULL);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
post_id INT REFERENCES posts(id)  NOT NULL,
user_id INT REFERENCES users(id) NOT NULL,
texts VARCHAR NOT NULL);

-- SELECT * FROM Comments WHERE post_id = :id

CREATE TABLE likes(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) NOT NULL,
post_id INT REFERENCES posts(id)  NOT NULL);

CREATE TABLE followers (
id SERIAL PRIMARY KEY,
person_following_id  INT REFERENCES users(id) NOT NULL, --- person_following_id
person_being_followed_id  INT REFERENCES users(id) NOT NULL); --- person_being_followed_id )

-- CREATE TABLE notifications (
--     user_id INT REFERENCES users(id) NOT NULL,
--     person_being_followed_id users(id) NOT NULL
--     person_following_id users(id) NOT NULL
--     type VARCHAR
    
-- ) 


INSERT INTO users (username,named,email,avatar) VALUES
('yahweh','yahweh','y@gmail.com',NULL),
('Elohim','Nissi','iamtheam.com','el.jpeg'),
('jesus','the messiah','messiah@yahoo.com','pic.png'),
('luke','lucas','lucas@gmail.com','lc.png');

INSERT INTO posts (user_id,image_url,caption,title,number_of_comments) VALUES
(2,'zoo.jpg','noah arc','refer to genesis',0),
(4,'hope.jpg','dove','there may be life',0),
(1,'pic.jpg','random','nice',0),
(1,'yay.jpg','smile_','a happy face',0),
(1,'what.jpg','frown_','a happy face',0);

INSERT INTO likes (user_id,post_id) VALUES
(1,2),
(2,1),
(3,1);

INSERT INTO followers (person_following_id, person_being_followed_id) VALUES
(1,3),
(2,1),
(3,1);

INSERT INTO comments (post_id,user_id,texts) VALUES
(1,2,'i love this pic thanks for sharing'),
(1,2,'nice'),
(2,2,'let there be life'),
(2,3,'glad to be welcomed');









