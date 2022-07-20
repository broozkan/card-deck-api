import sinon from "sinon";
import httpMocks from "node-mocks-http";
import { deckRepository } from "../repository";
import { createDeck } from "./deck.controller";
import assert from "assert";
import { ResponseType } from "../types/response.type";


describe("Deck Controller", function () {
    it('should call repository.saveDeck when createDeck called with correct arguments', function () {
        var save = sinon.spy(deckRepository, 'saveDeck');
        var req = httpMocks.createRequest({
            method: 'POST',
            url: '/decks',
            body: {
                type: "FULL",
                isShuffled: true
            }
        });

        var res = httpMocks.createResponse()
        createDeck(req, res)
        save.restore()
        sinon.assert.calledWithExactly(save, req.body)
    })

    it('should call repository.createExchange when createExchange called with missing arguments', async function () {
        let expectedResponse: ResponseType = {
            isSuccess: false,
            error: "Deck validation failed"
        }

        var req = httpMocks.createRequest({
            method: 'POST',
            url: '/decks',
            body: {
                type: "FULL"
            }
        });

        let res = await httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        await sinon.stub(deckRepository, 'saveDeck').resolves(expectedResponse);

        const result = await createDeck(req, res)

        assert.equal(result.error, expectedResponse.error);
    })
})