const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/aagamya.html'));
})

// port number listening
app.listen(port)