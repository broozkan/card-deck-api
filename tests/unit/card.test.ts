import assert from "assert";
import { generateCards, shuffleCards } from "../../helper/card"
import { FULL_TYPE, SHORT_TYPE } from "../../helper/constants"

describe('Test Card Helper', function () {
    it('it should create 52 cards when FULL type passed without shuffled', function () {
        let expectedCards = getFullDeckWithoutShuffled()
        var shuffled = false
        let actualCards = generateCards(shuffled, FULL_TYPE)

        assert.equal(actualCards.length, expectedCards.length)
    })

    it('it should create 52 cards when FULL type passed with shuffled', function () {
        let ordinaryCards = getFullDeckWithoutShuffled()
        var shuffled = true
        let actualCards = generateCards(shuffled, FULL_TYPE)

        assert.equal(actualCards.length, ordinaryCards.length)
        assert.notDeepEqual(actualCards, ordinaryCards)
    })

    it('it should create 32 cards when SHORT type passed without shuffled', function () {
        let expectedCards = getShortDeckWithoutShuffled()
        var shuffled = false
        let actualCards = generateCards(shuffled, SHORT_TYPE)

        assert.equal(actualCards.length, expectedCards.length)
    })

    it('it should create 32 cards when SHORT type passed with shuffled', function () {
        let ordinaryCards = getShortDeckWithoutShuffled()
        var shuffled = true
        let actualCards = generateCards(shuffled, SHORT_TYPE)

        assert.equal(actualCards.length, ordinaryCards.length)
        assert.notDeepEqual(actualCards, ordinaryCards)
    })
    it('it should shuffle cards when shuffleCards called', function () {
        let ordinaryCards = getFullDeckWithoutShuffled()
        let shuffledCards = shuffleCards(ordinaryCards)

        assert.notDeepEqual(shuffledCards, ordinaryCards)
    })
})




function getFullDeckWithoutShuffled() {
    return [
        { code: 'H2', suit: 'hearts', value: 2 },
        { code: 'H3', suit: 'hearts', value: 3 },
        { code: 'H4', suit: 'hearts', value: 4 },
        { code: 'H5', suit: 'hearts', value: 5 },
        { code: 'H6', suit: 'hearts', value: 6 },
        { code: 'H7', suit: 'hearts', value: 7 },
        { code: 'H8', suit: 'hearts', value: 8 },
        { code: 'H9', suit: 'hearts', value: 9 },
        { code: 'H10', suit: 'hearts', value: 10 },
        { code: 'HJ', suit: 'hearts', value: 'J' },
        { code: 'HQ', suit: 'hearts', value: 'Q' },
        { code: 'HK', suit: 'hearts', value: 'K' },
        { code: 'HA', suit: 'hearts', value: 'A' },
        { code: 'D2', suit: 'diamonds', value: 2 },
        { code: 'D3', suit: 'diamonds', value: 3 },
        { code: 'D4', suit: 'diamonds', value: 4 },
        { code: 'D5', suit: 'diamonds', value: 5 },
        { code: 'D6', suit: 'diamonds', value: 6 },
        { code: 'D7', suit: 'diamonds', value: 7 },
        { code: 'D8', suit: 'diamonds', value: 8 },
        { code: 'D9', suit: 'diamonds', value: 9 },
        { code: 'D10', suit: 'diamonds', value: 10 },
        { code: 'DJ', suit: 'diamonds', value: 'J' },
        { code: 'DQ', suit: 'diamonds', value: 'Q' },
        { code: 'DK', suit: 'diamonds', value: 'K' },
        { code: 'DA', suit: 'diamonds', value: 'A' },
        { code: 'C2', suit: 'clubs', value: 2 },
        { code: 'C3', suit: 'clubs', value: 3 },
        { code: 'C4', suit: 'clubs', value: 4 },
        { code: 'C5', suit: 'clubs', value: 5 },
        { code: 'C6', suit: 'clubs', value: 6 },
        { code: 'C7', suit: 'clubs', value: 7 },
        { code: 'C8', suit: 'clubs', value: 8 },
        { code: 'C9', suit: 'clubs', value: 9 },
        { code: 'C10', suit: 'clubs', value: 10 },
        { code: 'CJ', suit: 'clubs', value: 'J' },
        { code: 'CQ', suit: 'clubs', value: 'Q' },
        { code: 'CK', suit: 'clubs', value: 'K' },
        { code: 'CA', suit: 'clubs', value: 'A' },
        { code: 'S2', suit: 'spades', value: 2 },
        { code: 'S3', suit: 'spades', value: 3 },
        { code: 'S4', suit: 'spades', value: 4 },
        { code: 'S5', suit: 'spades', value: 5 },
        { code: 'S6', suit: 'spades', value: 6 },
        { code: 'S7', suit: 'spades', value: 7 },
        { code: 'S8', suit: 'spades', value: 8 },
        { code: 'S9', suit: 'spades', value: 9 },
        { code: 'S10', suit: 'spades', value: 10 },
        { code: 'SJ', suit: 'spades', value: 'J' },
        { code: 'SQ', suit: 'spades', value: 'Q' },
        { code: 'SK', suit: 'spades', value: 'K' },
        { code: 'SA', suit: 'spades', value: 'A' }
    ]
}

function getShortDeckWithoutShuffled() {
    return [
        { code: 'H7', suit: 'hearts', value: 7 },
        { code: 'H8', suit: 'hearts', value: 8 },
        { code: 'H9', suit: 'hearts', value: 9 },
        { code: 'H10', suit: 'hearts', value: 10 },
        { code: 'HJ', suit: 'hearts', value: 'J' },
        { code: 'HQ', suit: 'hearts', value: 'Q' },
        { code: 'HK', suit: 'hearts', value: 'K' },
        { code: 'HA', suit: 'hearts', value: 'A' },
        { code: 'D7', suit: 'diamonds', value: 7 },
        { code: 'D8', suit: 'diamonds', value: 8 },
        { code: 'D9', suit: 'diamonds', value: 9 },
        { code: 'D10', suit: 'diamonds', value: 10 },
        { code: 'DJ', suit: 'diamonds', value: 'J' },
        { code: 'DQ', suit: 'diamonds', value: 'Q' },
        { code: 'DK', suit: 'diamonds', value: 'K' },
        { code: 'DA', suit: 'diamonds', value: 'A' },
        { code: 'C7', suit: 'clubs', value: 7 },
        { code: 'C8', suit: 'clubs', value: 8 },
        { code: 'C9', suit: 'clubs', value: 9 },
        { code: 'C10', suit: 'clubs', value: 10 },
        { code: 'CJ', suit: 'clubs', value: 'J' },
        { code: 'CQ', suit: 'clubs', value: 'Q' },
        { code: 'CK', suit: 'clubs', value: 'K' },
        { code: 'CA', suit: 'clubs', value: 'A' },
        { code: 'S7', suit: 'spades', value: 7 },
        { code: 'S8', suit: 'spades', value: 8 },
        { code: 'S9', suit: 'spades', value: 9 },
        { code: 'S10', suit: 'spades', value: 10 },
        { code: 'SJ', suit: 'spades', value: 'J' },
        { code: 'SQ', suit: 'spades', value: 'Q' },
        { code: 'SK', suit: 'spades', value: 'K' },
        { code: 'SA', suit: 'spades', value: 'A' }
    ]
}

function getDeckWithThreeDrawWithoutShuffled() {
    return [
        { code: 'H5', suit: 'hearts', value: 5 },
        { code: 'H6', suit: 'hearts', value: 6 },
        { code: 'H7', suit: 'hearts', value: 7 },
        { code: 'H8', suit: 'hearts', value: 8 },
        { code: 'H9', suit: 'hearts', value: 9 },
        { code: 'H10', suit: 'hearts', value: 10 },
        { code: 'HJ', suit: 'hearts', value: 'J' },
        { code: 'HQ', suit: 'hearts', value: 'Q' },
        { code: 'HK', suit: 'hearts', value: 'K' },
        { code: 'HA', suit: 'hearts', value: 'A' },
        { code: 'D2', suit: 'diamonds', value: 2 },
        { code: 'D3', suit: 'diamonds', value: 3 },
        { code: 'D4', suit: 'diamonds', value: 4 },
        { code: 'D5', suit: 'diamonds', value: 5 },
        { code: 'D6', suit: 'diamonds', value: 6 },
        { code: 'D7', suit: 'diamonds', value: 7 },
        { code: 'D8', suit: 'diamonds', value: 8 },
        { code: 'D9', suit: 'diamonds', value: 9 },
        { code: 'D10', suit: 'diamonds', value: 10 },
        { code: 'DJ', suit: 'diamonds', value: 'J' },
        { code: 'DQ', suit: 'diamonds', value: 'Q' },
        { code: 'DK', suit: 'diamonds', value: 'K' },
        { code: 'DA', suit: 'diamonds', value: 'A' },
        { code: 'C2', suit: 'clubs', value: 2 },
        { code: 'C3', suit: 'clubs', value: 3 },
        { code: 'C4', suit: 'clubs', value: 4 },
        { code: 'C5', suit: 'clubs', value: 5 },
        { code: 'C6', suit: 'clubs', value: 6 },
        { code: 'C7', suit: 'clubs', value: 7 },
        { code: 'C8', suit: 'clubs', value: 8 },
        { code: 'C9', suit: 'clubs', value: 9 },
        { code: 'C10', suit: 'clubs', value: 10 },
        { code: 'CJ', suit: 'clubs', value: 'J' },
        { code: 'CQ', suit: 'clubs', value: 'Q' },
        { code: 'CK', suit: 'clubs', value: 'K' },
        { code: 'CA', suit: 'clubs', value: 'A' },
        { code: 'S2', suit: 'spades', value: 2 },
        { code: 'S3', suit: 'spades', value: 3 },
        { code: 'S4', suit: 'spades', value: 4 },
        { code: 'S5', suit: 'spades', value: 5 },
        { code: 'S6', suit: 'spades', value: 6 },
        { code: 'S7', suit: 'spades', value: 7 },
        { code: 'S8', suit: 'spades', value: 8 },
        { code: 'S9', suit: 'spades', value: 9 },
        { code: 'S10', suit: 'spades', value: 10 },
        { code: 'SJ', suit: 'spades', value: 'J' },
        { code: 'SQ', suit: 'spades', value: 'Q' },
        { code: 'SK', suit: 'spades', value: 'K' },
        { code: 'SA', suit: 'spades', value: 'A' }
    ]
}

export {
    getFullDeckWithoutShuffled,
    getShortDeckWithoutShuffled,
    getDeckWithThreeDrawWithoutShuffled
}