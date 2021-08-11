const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admins');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({ storage: storage });
app.post('/blog-backend/upload', upload.single('file'), (req, res) => {
    res.status(200).json('Image Uploaded')
})

app.use('/blog-backend/auth', authRoute);
app.use('/blog-backend/admins', adminRoute);
app.use('/blog-backend/posts', postRoute);
app.use('/blog-backend/categories', categoryRoute);

app.use('/', (req, res) => {
    console.log('main url');
})

app.listen('5000', () => {
    console.log('backend running');
})