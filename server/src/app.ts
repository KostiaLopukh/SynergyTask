import 'reflect-metadata';
import express, {NextFunction, Request, Response} from 'express';
import {createConnection} from 'typeorm';
import {configs} from './contants/configs';
import {apiRouter} from './routes/apiRouter';
import cors from 'cors';

const {PORT} = configs;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:3000'}));

app.use(apiRouter);
app.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
    res
        .status(err.status)
        .json({message: err.message});
});

app.listen(PORT, async () => {
    console.log(`Server is listening PORT ${PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
