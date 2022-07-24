import { ICard } from "../models/card.model";
import { IDeck } from "../models/deck.model";

const prepareDeckData = (type: String, shuffled: Boolean, cards: Array<ICard>): IDeck => {
    return {
        type,
        shuffled,
        cards
    }
}




export {
    prepareDeckData
}