const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Internet9797@cluster0.mtkuk.mongodb.net/Technofania', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
.then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log(err);
})
