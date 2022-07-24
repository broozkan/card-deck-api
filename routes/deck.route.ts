import express from "express"
import { deckController } from "../controllers"

const router = express.Router();

router
    .route('/:deckId?')
    .post(deckController.createDeck)
    .get(deckController.getDeck)
    .put(deckController.drawCard)


export { router as deckRouter }