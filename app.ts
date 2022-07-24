import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import httpStatus from 'http-status'
import { deckRouter } from './routes/deck.route';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const options: cors.CorsOptions = {
    origin: "*"
};

app.use(cors(options));


app.use('/decks', deckRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    next((httpStatus.NOT_FOUND, 'Not found'));
});

export default app