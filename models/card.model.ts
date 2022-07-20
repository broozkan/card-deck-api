import { Schema, model, Document } from 'mongoose';

export interface ICard {
    value: String,
    suit: String,
    code: String
}


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

export { Card }