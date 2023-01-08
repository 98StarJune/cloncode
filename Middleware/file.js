const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const fileUpload = multer({
   // limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, req.userId + "_" + new Date() + "_" + file.originalname)
        }
    }),
    filter : {

    }
});

module.exports = fileUpload;
