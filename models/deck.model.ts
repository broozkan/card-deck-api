import { Schema, model, Document } from 'mongoose';
import { ICard, Card, cardSchema } from "./card.model"
import { FULL_TYPE, SHORT_TYPE } from '../helper/constants';

export interface IDeck {
    _id?: String,
    deckId?: String,
    type: String,
    shuffled: Boolean
    cards?: Array<ICard>
}

const deckSchema: Schema = new Schema<IDeck>(
    {
        deckId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: [FULL_TYPE, SHORT_TYPE],
            default: FULL_TYPE,
            required: false
        },
        shuffled: {
            type: Boolean,
            default: false,
            required: false
        },
        cards: [cardSchema]
    }
);

const Deck = model<IDeck>('Deck', deckSchema);

export { Deck };