const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Technofania', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
.then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log(err);
})
