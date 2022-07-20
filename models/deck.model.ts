import { Schema, model, Document } from 'mongoose';
import { ICard } from "./card.model"

export interface IDeck {
    type: String,
    isShuffled: Boolean
    cards?: Array<ICard>
}

const deckSchema: Schema = new Schema<IDeck>(
    {
        type: {
            type: String,
            enum: ["FULL", "SHORT"],
            default: "FULL",
            required: false
        },
        isShuffled: {
            type: Boolean,
            default: false,
            required: false
        },
        cards: [{
            type: Schema.Types.ObjectId,
            required: true
        }]
    }
);

const Deck = model<IDeck>('Deck', deckSchema);

export { Deck };