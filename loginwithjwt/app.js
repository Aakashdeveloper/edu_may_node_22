const express = require('express');
const app = express();
const db = require('./db');
const port = 5000;
const cors = require('cors');

//middleware
app.use(cors());

const AuthController = require('./controller/autController');
app.use('/api/auth', AuthController);

app.listen(port,() => {
    console.log(`Running on the port ${port}`)
})