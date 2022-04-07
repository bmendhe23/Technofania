const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const fs = require('fs');
require('dotenv').config();
require('./db/connection');
const Agamya = require('./models/agamya');
const port = process.env.PORT || 8080;
const multer = require('multer');
const AWS = require('aws-sdk');
const User = require('./models/user');
const Player = require('./models/playerData');
const sqluser = require('./models/sqlData');

app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false
}));
  
app.use(flash());

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

// view engine

app.set('view engine', 'hbs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req,res,next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// storage

let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.teamname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/register', (req, res) => {
    res.render('registerPage')
})

app.get('/team22', (req, res) => {
    res.render('team2k22');
})

app.get('/team23', (req, res) => {
    res.render('team2k23');
})

app.get('/team24', (req, res) => {
    res.render('team');
}) 

app.get('/events', (req, res) => {
    res.render('events');
}) 




app.post("/register",(req,res)=>{
    try{
      const parsed = parseInt(req.body.username);
      const pass = req.body.password;
      if(pass.length < 8 ){
        req.session.message = {
          type: 'error',
          message: 'Password should be atleast of 8 characters'
        }
        res.redirect('/register')
        return ;
      }else if(pass.length > 20){
        req.session.message = {
          type: 'error',
          message: 'Password should be of atmost 20 characters'
        }
        res.redirect('/register')
        return;
      }
      if (isNaN(parsed)) {
        req.session.message = {
          type: 'error',
          message: 'Username can only be a Roll Number'
        }
        res.redirect('/register')
        return ;
      }else if(parsed <100000000 || parsed>999999999){
        req.session.message = {
          type: 'error',
          message: 'Not a valid Roll number'
        }
        res.redirect('/register')
        return;
      }
        User.register({username:parsed}, req.body.password, function(err, user) {
          if (err) { 

            req.session.message = {
              type: 'error',
              message: `${err.message}`
          }
          res.redirect('/register')  //TODO

          }else{
            const newPlayer = new Player({ username: parsed });
            newPlayer.save(function (err) {
              if (err) {
                req.session.message = {
                  type: 'error',
                  message: 'Registration failed'
              }
              res.redirect('/register')  //TODO

              }else{
                console.log("PLAYER CREATED");
                const newSqlUser = new sqluser({
                  username:parsed,
                  levels:[
                    {
                      levelNumber:"0",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"1",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"2",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"3",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"4",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"5",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"6",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"7",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"8",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"9",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"10",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"11",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"12",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"13",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"14",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"15",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"16",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"17",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"18",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"19",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"20",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"21",
                      progress:"false",
                      query:""
                    },
                    {
                      levelNumber:"22",
                      progress:"false",
                      query:""
                    }
                  ]
                })
                newSqlUser.save(function (err) {
                  if (err) {
                    req.session.message = {
                      type: 'error',
                      message: 'Registration failed'
                  }
                  res.redirect('/register')  //TODO
                  }else{
                    req.session.message = {
                      type: 'success',
                      message: `You have Registered for Technofania'22`
                  }
                    res.redirect('/register')  //TODO
                  }
                });
              }
            });
  
            
          }
       
      });
      }catch(err){
  req.session.message = {
    type: 'error',
    message: 'Registration failed'
}
  res.send('false');
      }
})

// port number listening
app.listen(port, () => {
    console.log('App is listening at port 8080');
})
