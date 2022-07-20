import { Request, Response } from "express";
import httpStatus from "http-status";
import { config } from "../config/config";
import { IDeck } from "../models/deck.model";
import { deckRepository } from "../repository";
import { ResponseType } from "../types/response.type";

const createDeck = async (req: Request, res: Response): Promise<ResponseType> => {
    let deck: IDeck = {
        type: req.body.type,
        isShuffled: req.body.isShuffled
    }
    return await deckRepository.saveDeck(deck)
}

export { createDeck }


