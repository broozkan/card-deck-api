import { ICard, IDeck } from "../interfaces/interfaces"

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