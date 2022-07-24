import { SHORT_TYPE } from "./constants";
import deckTemplate from "../common/deck";
import { ICard, IDrawData } from "../interfaces/interfaces";

const generateCards = (shuffled: Boolean, type: String): Array<ICard> => {
    let cards: Array<ICard> = []
    deckTemplate.forEach((item) => {
        if (type === SHORT_TYPE && shouldExcludeForShort(item.value as Number)) {
            return
        }
        cards.push({
            code: getCardCode(item.suit, item.value),
            suit: item.suit,
            value: item.value
        })
    })
    if (shuffled) {
        cards = shuffleCards(cards)
    }
    return cards
}

const shouldExcludeForShort = (value: Number): Boolean => {
    if (2 >= value || value <= 6) {
        return true
    }
    return false
}

const getCardCode = (suit: String, value: Number | String): String => {
    return `${suit[0].toLocaleUpperCase()}${value}`
}

const shuffleCards = (cards: Array<ICard>): Array<ICard> => {
    let shuffledCards: Array<ICard>
    shuffledCards = cards
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return shuffledCards
}


const drawCards = (cards: Array<ICard>, count: Number): IDrawData => {
    if (cards.length < count) count = cards.length

    let drawedCards: Array<ICard> = cards.splice(0, count as number)
    return {
        newCards: cards,
        drawedCards
    }
}

export {
    generateCards,
    shuffleCards,
    drawCards
}