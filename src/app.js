const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config();
require('./db/connection');
const Agamya = require('./models/agamya');
const port = process.env.PORT || 3000;
const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../public')));

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
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/aagamya.html'));
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
        res.status(201).send(registeredTeam);

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
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: req.file.filename,
                    ContentType: mimetype
                }).promise();

            }
        })

    } catch (err) {
        res.status(400).send(err);
    }
})

// port number listening
app.listen(port)