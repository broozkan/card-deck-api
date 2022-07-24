import { Request, Response } from "express";
import httpStatus from "http-status";
import { drawCards, generateCards } from "../helper/card";
import { prepareDeckData } from "../helper/deck";
import generateUUID from "../helper/uuid";
import { validateBodyFields, validateParamFields } from "../helper/validation";
import { deckRepository } from "../repository";

const createDeck = async (req: Request, res: Response) => {
    let validationErr = validateBodyFields(["type"], req)
    if (validationErr.length > 0) {
        res.status(httpStatus.BAD_REQUEST).send(validationErr)
        return false
    }
    let cards = generateCards(req.body.shuffled, req.body.type)
    let deck = prepareDeckData(req.body.type, req.body.shuffled, cards)
    deck.deckId = generateUUID()
    let response = await deckRepository.saveDeck(deck)

    if (response.isSuccess) {
        res.status(httpStatus.CREATED).send({
            deckId: response.data.deckId,
            type: response.data.type,
            shuffled: response.data.shuffled,
            remaining: response.data.cards.length
        })
    }
    res.status(httpStatus.BAD_REQUEST).send(response.error)
}

const getDeck = async (req: Request, res: Response) => {
    let validationErr = validateParamFields(["deckId"], req)
    if (validationErr.length > 0) {
        res.status(httpStatus.BAD_REQUEST).send(validationErr)
        return false
    }
    let response = await deckRepository.getDeck(req.params.deckId)
    if (response.isSuccess) {
        res.status(httpStatus.OK).send({
            deckId: response.data.deckId,
            type: response.data.type,
            shuffled: response.data.shuffled,
            remaining: response.data.cards.length,
            cards: response.data.cards
        })
        return false
    }
    response.statusCode ? res.status(response.statusCode as number).send(response.error) : res.status(httpStatus.BAD_REQUEST).send(response.error)
}

const drawCard = async (req: Request, res: Response) => {
    let validationErr = validateParamFields(["deckId"], req)
    if (validationErr.length > 0) {
        res.status(httpStatus.BAD_REQUEST).send(validationErr)
        return false
    }
    validationErr = validateBodyFields(["count"], req)
    if (validationErr.length > 0) {
        res.status(httpStatus.BAD_REQUEST).send(validationErr)
        return false
    }
    let response = await deckRepository.getDeck(req.params.deckId)

    if (!response.isSuccess) {
        console.error("could not get deck data", response.error)
        res.status(httpStatus.BAD_REQUEST).send(response.error)
        return false
    }

    let drawData = drawCards(response.data.cards, req.body.count)
    let newDeck = prepareDeckData(response.data.type, response.data.shuffled, drawData.newCards)
    response = await deckRepository.updateDeck(response.data._id, newDeck)
    if (response.isSuccess) {
        res.status(httpStatus.OK).send({
            cards: drawData.drawedCards
        })
        return false
    }
    res.status(httpStatus.BAD_REQUEST).send(response.error)
}

export {
    createDeck,
    getDeck,
    drawCard
}


