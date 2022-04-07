const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DBURI;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(DB_URL, connectionParams)
.then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log(err);
})
