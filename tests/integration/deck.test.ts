import { setupTestDB } from "../utils/setupTestDB";
import request from 'supertest'
import httpStatus from "http-status";
import app from '../../app'
import { FULL_TYPE } from "../../helper/constants";
import { getDeckWithThreeDrawWithoutShuffled, getFullDeckWithoutShuffled } from "../unit/helper/card.test";
import assert from "assert";
import { insertDeck } from "../fixtures/deck.fixture";
import httpMocks from "node-mocks-http";
import { IDeck } from "../../interfaces/interfaces";


setupTestDB()


describe('Deck Routes', function () {
    describe('POST /decks', function () {
        test('should create a deck when valid request comes', async function () {
            let req = httpMocks.createRequest({
                method: 'POST',
                url: `/decks`,
                type: FULL_TYPE,
                shuffled: false

            });
            const res = await request(app)
                .post('/decks')
                .send(req)
                .expect(httpStatus.CREATED);

            assert.equal(res.body.remaining, 52)
            assert.equal(res.body.shuffled, req.shuffled)
            assert.equal(res.body.type, req.type)
        })
        test('should not create a deck when request has missing fields comes', async function () {
            let req = httpMocks.createRequest({
                method: 'POST',
                url: `/decks`,
                shuffled: false,
            });
            const res = await request(app)
                .post('/decks')
                .send(req)
                .expect(httpStatus.BAD_REQUEST);

        })
    })

    describe('GET /decks/:deckId', function () {
        let deckId = "dccc8325-593e-4ca0-a1dd-c347159a8c9a"
        let cards = getFullDeckWithoutShuffled()
        let newDeck: IDeck
        beforeEach(async () => {
            newDeck = {
                type: FULL_TYPE,
                shuffled: false,
                deckId,
                cards
            };

            await insertDeck(newDeck)
            setTimeout(function () { }, 4000);
        });
        test('should return deck when valid request comes', async function () {
            const res = await request(app)
                .get(`/decks/${deckId}`)
                .send()
                .expect(httpStatus.OK);

            assert.equal(res.body.remaining, cards.length)
            assert.equal(res.body.shuffled, newDeck.shuffled)
            assert.equal(res.body.type, newDeck.type)
        })

        test('should return bad request when deckId is missing', async function () {
            const res = await request(app)
                .get(`/decks`)
                .send()
                .expect(httpStatus.BAD_REQUEST);
        })

        test('should return not found when deckId is wrong', async function () {
            const res = await request(app)
                .get(`/decks/1234`)
                .send()
                .expect(httpStatus.NOT_FOUND);
        })
    })
    describe('PUT /decks/:deckId', function () {
        let deckId = "0f96ec7f-3de4-4f44-9a63-36b884a2c8f6"
        let cards = getFullDeckWithoutShuffled()
        let updatedCards = getDeckWithThreeDrawWithoutShuffled()
        let newDeck: IDeck
        let updatedDeck: IDeck
        beforeEach(async () => {
            newDeck = {
                type: FULL_TYPE,
                shuffled: false,
                deckId,
                cards
            };
            updatedDeck = {
                type: newDeck.type,
                shuffled: newDeck.shuffled,
                deckId,
                cards: updatedCards
            }
            await insertDeck(newDeck)
            setTimeout(function () { }, 4000);
        });

        test('should draw cards and update existing one when valid request comes', async function () {
            let req = httpMocks.createRequest({
                method: 'PUT',
                url: `/decks/${deckId}`,
                count: 3,
                params: {
                    deckId
                }
            });

            const res = await request(app)
                .put(`/decks/${deckId}`)
                .send(req)
                .expect(httpStatus.OK);
        })
    })
})