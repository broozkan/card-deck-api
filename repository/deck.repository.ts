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
        res.error = err._message
        res.isSuccess = false
    }
    return res
}

export {
    saveDeck
}