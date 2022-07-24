import sinon from "sinon";
import httpMocks from "node-mocks-http";
import { deckRepository } from "../../repository";
import { createDeck, drawCard, getDeck } from "../../controllers/deck.controller";
import assert from "assert";
import { ResponseType } from "../../types/response.type";
import httpStatus from "http-status";
import { getDeckWithThreeDrawWithoutShuffled, getFullDeckWithoutShuffled } from "./card.test";
var sandbox = require("sinon").createSandbox();


describe("Deck Controller", function () {
    afterEach(function () {
        sandbox.restore();
    });
    it('should call repository.saveDeck when createDeck called with correct arguments', function () {
        let save = sinon.spy(deckRepository, 'saveDeck');
        let req = httpMocks.createRequest({
            method: 'POST',
            url: '/decks',
            body: {
                type: "FULL",
                shuffled: true
            }
        });
        let expectedSaveDeckCall = {
            deckId: sinon.match.string,
            type: req.body.type,
            shuffled: req.body.shuffled,
            cards: sinon.match.array
        }
        let res = httpMocks.createResponse()
        createDeck(req, res)
        save.restore()
        sinon.assert.calledWithMatch(save, expectedSaveDeckCall)
    })

    it('should call repository.createDeck when createDeck called with missing arguments and it should send bad request', async function () {
        let expectedResponse: ResponseType = {
            isSuccess: false,
            error: "Deck validation failed"
        }

        let req = httpMocks.createRequest({
            method: 'POST',
            url: '/decks',
            body: {
                type: "FULL"
            }
        });

        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await sandbox.stub(deckRepository, 'saveDeck').resolves(expectedResponse);

        const result = await createDeck(req, res)

        assert.equal(res.statusCode, httpStatus.BAD_REQUEST);
    })

    it('should get deck data when getDeck called with valid deckId', function () {
        let deck = sinon.spy(deckRepository, 'getDeck');
        let deckId = "521b0293-01f7-44c2-9990-27079eb2352d"
        let req = httpMocks.createRequest({
            method: 'GET',
            url: `/decks/${deckId}`,
            params: {
                deckId
            }
        });

        let res = httpMocks.createResponse()
        getDeck(req, res)
        deck.restore()
        sinon.assert.calledWithMatch(deck, deckId)
    })

    it('should throw error when deckId has not passed in url', async function () {
        let deckId = "521b0293-01f7-44c2-9990-27079eb2352d"
        let req = httpMocks.createRequest({
            method: 'GET',
            url: `/decks/${deckId}`,
        });

        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await getDeck(req, res)

        assert.equal(res.statusCode, httpStatus.BAD_REQUEST);
    })

    it('should return deck data when getDeck called ', async function () {
        let deckId = "4bf31712-3278-4155-af44-6f3d983e357c"
        let expectedResponse: ResponseType = {
            isSuccess: true,
            data: {
                deckId,
                type: "FULL",
                shuffled: false,
                remaining: 52,
                cards: getFullDeckWithoutShuffled()
            }
        }

        let req = httpMocks.createRequest({
            method: 'GET',
            url: `/decks/${deckId}`,
            params: {
                deckId
            }
        });

        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await sandbox.stub(deckRepository, 'getDeck').resolves(expectedResponse);

        await getDeck(req, res)
        let actualData = res._getData()

        assert.equal(res.statusCode, httpStatus.OK)
        assert.deepEqual(actualData, expectedResponse.data)
    })

    it('given valid request when drawCard called then it should update deck properly', async function () {
        let deckId = "4bf31712-3278-4155-af44-6f3d983e357c"
        let expectedGetDeckResponse: ResponseType = {
            isSuccess: true,
            data: {
                deckId,
                type: "FULL",
                shuffled: false,
                remaining: 52,
                cards: getFullDeckWithoutShuffled()
            }
        }
        let expectedUpdateDeckResponse: ResponseType = {
            isSuccess: true,
            data: {
                deckId,
                type: "FULL",
                shuffled: false,
                remaining: 49,
                cards: getDeckWithThreeDrawWithoutShuffled()
            }
        }
        let expectedResponse = {
            "cards": [{ "code": "H2", "suit": "hearts", "value": 2 }, { "code": "H3", "suit": "hearts", "value": 3 }, { "code": "H4", "suit": "hearts", "value": 4 }]
        }
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: `/decks/${deckId}`,
            params: {
                deckId
            },
            body: {
                count: 3
            }
        });
        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await sandbox.stub(deckRepository, 'getDeck').resolves(expectedGetDeckResponse);
        await sandbox.stub(deckRepository, 'updateDeck').resolves(expectedUpdateDeckResponse);

        await drawCard(req, res)
        let actualResData = res._getData()
        assert.equal(res.statusCode, httpStatus.OK)
        assert.deepEqual(actualResData, expectedResponse)
    })

    it('given missing count request when drawCard called then it should return bad request', async function () {
        let deckId = "4bf31712-3278-4155-af44-6f3d983e357c"
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: `/decks/${deckId}`,
            params: {
                deckId
            },
            body: {
            }
        });
        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await drawCard(req, res)
        assert.equal(res.statusCode, httpStatus.BAD_REQUEST)
    })

    it('given missing deckId in url when drawCard called then it should return bad request', async function () {
        let deckId = "4bf31712-3278-4155-af44-6f3d983e357c"
        let req = httpMocks.createRequest({
            method: 'PUT',
            url: `/decks/${deckId}`,
            body: {
                count: 3
            }
        });
        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await drawCard(req, res)
        assert.equal(res.statusCode, httpStatus.BAD_REQUEST)
    })

    it('given non-existing deckId when drawCard called then it return bad request', async function () {
        let deckId = "1234"
        let expectedGetDeckResponse: ResponseType = {
            isSuccess: false,
            error: "not found error"
        }

        let req = httpMocks.createRequest({
            method: 'PUT',
            url: `/decks/${deckId}`,
            params: {
                deckId
            },
            body: {
                count: 3
            }
        });
        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await sandbox.stub(deckRepository, 'getDeck').resolves(expectedGetDeckResponse);

        await drawCard(req, res)
        assert.equal(res.statusCode, httpStatus.BAD_REQUEST)
    })

    it('given valid request when drawCard called when could not execute update operation then it should return bad request', async function () {
        let deckId = "4bf31712-3278-4155-af44-6f3d983e357c"
        let expectedGetDeckResponse: ResponseType = {
            isSuccess: true,
            data: {
                deckId,
                type: "FULL",
                shuffled: false,
                remaining: 52,
                cards: getFullDeckWithoutShuffled()
            }
        }
        let expectedUpdateDeckResponse: ResponseType = {
            isSuccess: false,
            error: "some update error"
        }

        let req = httpMocks.createRequest({
            method: 'PUT',
            url: `/decks/${deckId}`,
            params: {
                deckId
            },
            body: {
                count: 3
            }
        });
        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await sandbox.stub(deckRepository, 'getDeck').resolves(expectedGetDeckResponse);
        await sandbox.stub(deckRepository, 'updateDeck').resolves(expectedUpdateDeckResponse);

        await drawCard(req, res)
        assert.equal(res.statusCode, httpStatus.BAD_REQUEST)
    })
})