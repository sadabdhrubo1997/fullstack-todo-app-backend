import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import { corsOptions } from './utils/cors';
import router from './routes';

// initialize express app
const app = express();

// initialize necessary middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// testing endpoint
app.get('/up', async (req: Request, res: Response) => {
  res.status(200).send(`<h1>hello this is from \'/up\' route</h1>`);
});

app.use('/api',router);

// export app
export default app;
