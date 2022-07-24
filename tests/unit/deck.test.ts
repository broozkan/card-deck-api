import assert from "assert"
import { IDeck } from "../../models/deck.model"
import { generateCards } from "../../helper/card"
import { FULL_TYPE } from "../../helper/constants"
import { prepareDeckData } from "../../helper/deck"

describe('Deck Test Helper', function () {
    it('should create a deck when prepareDeckData called', function () {
        var cards = generateCards(false, FULL_TYPE)
        const expectedDeck: IDeck = {
            deckId: "07fb6cd7-6d37-4dd4-84d7-e6cf66ffec10",
            shuffled: false,
            type: FULL_TYPE,
            cards
        }


        let actualDeck = prepareDeckData(expectedDeck.type, expectedDeck.shuffled, cards)

        assert.equal(actualDeck.shuffled, expectedDeck.shuffled)
        assert.equal(actualDeck.type, expectedDeck.type)
        assert.equal(actualDeck.cards, expectedDeck.cards)
    })
})