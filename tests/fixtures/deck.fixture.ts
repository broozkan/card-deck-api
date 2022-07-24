import assert from "assert"
import { IDeck } from "../../interfaces/interfaces"
import { Deck } from "../../models"

const insertDeck = async (deck: IDeck) => {
    try {
        await Deck.create(deck)
    } catch (err: any) {
        // for failing test
        assert.equal(true, false)
    }
}

export {
    insertDeck
}