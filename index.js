const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./firebase');

//define routes
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const followerRouter = require('./routes/followers');
const commentsRouter = require('./routes/comments');


// -------- MIDDLEWARE
app.use(cors());
// parse application/x-www-form-urlencoded
//cors calls backend from frontend or else it will block u
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//get token and once retrieved set it as state in front end 
const checkFirebaseToken = (req, res, next) => {
  const { token } = req.body;

  // console.log (token)

  admin.auth().verifyIdToken(token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;

      console.log(decodedToken)
      // decodedToken=decodedToken.uid;
      next();
    }).catch(function(error) {
      // Handle error
      res.json('ERROR!!!!')
    });

}

//routes
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/follow', followerRouter);
app.use('/comments', commentsRouter);

app.use((err, req, res, next) => {
  res.status(400).json({error: err.toString()});
});

app.listen(port, ()=>{
  console.log(`listening at port ${port}`)
} )



//if you want to delete a user 
//delete/user/jen you can also use the function below and do a check

//--------------------------------------------------

//how do i check if this is the user who should be performing a particular action?
// decodedToken=decodedToken.uid;
//get the users uid
// const uidInPostgress='';
// const uidindecodedtken=req.decodedToken.uid;            //-------- look above 
// if (uidInPostgress===uidindecodedtken){
//   next();
//  } else{
//     res.json({error:'you are not the valid user'})
//   }




//const bouncer2=()={}
// -------- ROUTES
app.get('/', (req, res) => {
  res.json('Hello world');
})

//protected: uses firebase middleware
app.post('/unprotected', (req, res) => {
  const { email, id } = req.body;
  res.json(`Welcome! You are user ${email} with ${id}`);
})

app.post('/protected', checkFirebaseToken, 
//,bouncer2,
(req, res) => {
  res.json(`This is some sensitive data`);
})


