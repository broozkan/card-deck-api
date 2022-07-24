import httpStatus from "http-status"
import { Deck } from "../models"
import { IDeck } from "../models/deck.model"
import { ResponseType } from "../types/response.type"

const saveDeck = async (deck: IDeck): Promise<ResponseType> => {
    var res: ResponseType = { isSuccess: false }
    try {
        let result = await Deck.create(deck)
        res.data = result
        res.isSuccess = true
    } catch (err: any) {
        res.error = err
        res.isSuccess = false
    }
    return res
}

const getDeck = async (deckId: String): Promise<ResponseType> => {
    var res: ResponseType = { isSuccess: false }
    try {
        let result = await Deck.findOne({ deckId }, { "cards._id": 0 })
        if (!result) {
            res.error = "document not found"
            res.statusCode = httpStatus.NOT_FOUND
            res.isSuccess = false
        } else {
            res.data = result
            res.isSuccess = true
        }
    } catch (err: any) {
        res.error = err
        res.isSuccess = false
    }
    return res
}

const updateDeck = async (id: String, deck: IDeck): Promise<ResponseType> => {
    var res: ResponseType = { isSuccess: false }
    try {
        let result = await Deck.findByIdAndUpdate(id, deck)
        res.data = result
        res.isSuccess = true
    } catch (err: any) {
        res.error = err
        res.isSuccess = false
    }
    return res
}

export {
    saveDeck,
    getDeck,
    updateDeck
}