import { Schema, model, Document } from 'mongoose';
import { cardSchema } from "./card.model"
import { FULL_TYPE, SHORT_TYPE } from '../helper/constants';
import { IDeck } from '../interfaces/interfaces';

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