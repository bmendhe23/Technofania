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
    res.render('aagamya')
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

app.post('/register', upload.single('submission'), async (req, res) => {
    try {

        const registerTeam = new Agamya({
            teamname: req.body.teamname,
            member1Name: req.body.member1Name,
            member1Roll: req.body.member1Roll,
            member2Name: req.body.member2Name,
            member2Roll: req.body.member2Roll,
            member3Name: req.body.member3Name,
            member3Roll: req.body.member3Roll,
            member4Name: req.body.member4Name,
            member4Roll: req.body.member4Roll,
            member5Name: req.body.member5Name,
            member5Roll: req.body.member5Roll
        })

        const registeredTeam = await registerTeam.save();
    
        const fileName = req.file.filename;
        
        let fileContent
        fs.readFile(`./uploads/${fileName}` , (err, data) => {
            if(err)
                console.log(err);
            else {    
                fileContent = data;

                const mimetype = req.file.mimetype;

                s3.putObject({
                    Body: fileContent,
                    Bucket: process.env.BUCKET_NAME,
                    Key: req.file.filename,
                    ContentType: mimetype
                }).promise();

            }
        })

        req.session.message = {
            type: 'success',
            message: 'Registered successfully'
        }
        return res.status(201).redirect('/register');

    } catch (err) {
        req.session.message = {
            type: 'error',
            message: 'Registration failed'
        }
        return res.status(400).redirect('/register');
    }
})

// port number listening
app.listen(port, () => {
    console.log('App is listening at port 8080');
})
