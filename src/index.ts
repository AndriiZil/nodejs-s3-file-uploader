import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import multer from 'multer';

const app = express();

const { error } = dotenv.config();
if (error) {
    console.error(error);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 }, })

const PORT = process.env.PORT || 3000;
app.use(logger('dev'));

app.post('/upload', upload.single('avatar'), (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);

    return res.send('upload')
});

app.post('/uploads', upload.array('photos', 10), (req: Request, res: Response, next: NextFunction) => {

    return res.send('multiply uploads')
});

app.listen(PORT, () => console.log('Server started'));
