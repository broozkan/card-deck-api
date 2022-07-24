import { Schema, model, Document } from 'mongoose';
import { ICard } from '../interfaces/interfaces';

const cardSchema = new Schema<ICard>(
    {
        value: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        suit: {
            type: String,
            required: true
        },
    }
);

const Card = model<ICard>('Card', cardSchema);

export { Card, cardSchema }