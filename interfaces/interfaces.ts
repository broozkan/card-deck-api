export interface IDrawData {
    newCards: Array<ICard>
    drawedCards: Array<ICard>
}

export interface ICard {
    value: String | Number,
    suit: String,
    code: String
}

export interface IDeck {
    _id?: String,
    deckId?: String,
    type: String,
    shuffled: Boolean
    cards?: Array<ICard>
}