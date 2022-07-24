import { Deck } from "../../models"
import { IDeck } from "../../models/deck.model"

const insertDeck = async (deck: IDeck) => {
    await Deck.create(deck)
}

export {
    insertDeck
}