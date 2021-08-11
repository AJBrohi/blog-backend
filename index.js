const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admins');
const postRoute = require('./routes/posts');

dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(console.log('Connected'))
    .catch((error) => console.log(error));

app.use('/blog-backend/auth', authRoute);
app.use('/blog-backend/admins', adminRoute);
app.use('/blog-backend/posts', postRoute);

app.use('/', (req, res) => {
    console.log('main url');
})

app.listen('5000', () => {
    console.log('backend running');
})