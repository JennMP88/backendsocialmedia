DROP DATABASE IF EXISTS socialmedia;
CREATE DATABASE socialmedia;

\c socialmedia;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
uid VARCHAR NOT NULL, --unique
username VARCHAR NOT NULL, --unique
named VARCHAR NOT NULL,
email VARCHAR NOT NULL,    --unique
postedpic VARCHAR,
avatar VARCHAR );   --the attachment?

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) NOT NULL,
image_url VARCHAR NOT NULL,
caption VARCHAR NOT NULL,
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


INSERT INTO users (username,uid,named,email,avatar) VALUES
('yahweh', 'abc1', 'yahweh','y@gmail.com',NULL),
('Elohim', 'abc2', 'Nissi','iamtheam.com','el.jpeg'),
('jesus', 'abc3', 'the messiah','messiah@yahoo.com','pic.png'),
('luke', 'abc4', 'lucas','lucas@gmail.com','lc.png');

INSERT INTO users (username,uid,named,email,postedpic,avatar) VALUES
('yahweh', 'abc1', 'yahweh','y@gmail.com','https://media3.giphy.com/media/xzX3aNvsYw1XO/giphy.gif','https://media0.giphy.com/media/KIR860ssE6ITK/giphy.gif'),
('Elohim', 'abc2', 'Nissi','iamtheam.com','https://media3.giphy.com/media/VazO3hXAsNuDu/giphy.gif','https://media1.giphy.com/media/IvtWZCzn61hmM/giphy.gif'),
('jesus', 'abc3', 'the messiah','messiah@yahoo.com','https://media3.giphy.com/media/g7YDlrD5YLqfe/giphy.gif','https://media2.giphy.com/media/EE185t7OeMbTy/giphy.gif'),
('luke', 'abc4', 'lucas','lucas@gmail.com','https://media1.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif','https://media3.giphy.com/media/102mqDgAb4Kfug/giphy.gif');

INSERT INTO posts (user_id,image_url,caption,number_of_comments) VALUES
(2,'zoo.jpg','noah arc',0),
(4,'hope.jpg','dove',0),
(1,'pic.jpg','random',0),
(1,'yay.jpg','smile_',0),
(1,'what.jpg','frown_',0);

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
