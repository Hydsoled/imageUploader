const mongoose = require('mongoose');
const Image = require('../models/image');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/');
    },
    filename: (req, file, cb) => {
        let fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});

require('dotenv').config();
const DB_API = process.env.DB_HOST_DEV;
const DB_NAME = process.env.DB_NAME;


mongoose.connect(
    DB_API + DB_NAME,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
            console.log('error');
        } else {
            console.log('connected');
        }
    }
);

module.exports = (app) => {
    app.get('/', (req, res) => {
        let datas = '';
        Image.find({name: null}, (error, result) => {
            if (!error) {
                datas = result;
            } else {
                console.log('cant get non submitted images');
            }
            res.render('index.ejs', {datas: datas});

        });
    });
    app.get('/submitted', (req, res) => {
        let datas = '';
        Image.find({name: {$ne: null}}, (error, result) => {
            if (!error) {
                datas = result;
                console.log(datas);
            } else {
                console.log('cant get non submitted images');
            }
            res.render('views/submitted.ejs', {datas: datas});

        });
    });
    app.get('/addImages', (req, res) => {
        res.render('views/addImages.ejs');
    });
    app.post('/uploadImage', upload.single('photo'), (req, res, next) => {
        if (req.file) {
            const image = new Image({
                _id: new mongoose.Types.ObjectId(),
                name: null,
                imagePath: 'images/' + req.file.filename
            });
            image.save()
                .then(result => {
                    console.log(result);
                }, err => {
                    console.log(err);
                })
            res.status(200).send('nice');
        } else {
            res.status(500).send('Something broke!');
        }
    });

    app.post('/updateImage', (req, res, next) => {
        let data = JSON.parse(Object.keys(req.body));
        Image.updateOne({imagePath: data.imagePath}, {$set : {name: data.imgName}}).catch(
            (error, affected, resp)=>{
                console.log(error);
            }
        );
    });
}
