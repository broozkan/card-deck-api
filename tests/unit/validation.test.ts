import assert from "assert"
import httpMocks from "node-mocks-http"
import { validateBodyFields, validateParamFields } from "../../helper/validation"

describe('Validation Test Helper', function () {
    it('should return error when validateParamFields called with required parts is missing in params', function () {
        let requiredFields = ["test", "test1"]
        let expectedResponse = ['please provide test1 field inside url']
        let req = httpMocks.createRequest({
            params: {
                "test": "123"
            }
        });

        let response = validateParamFields(requiredFields, req)
        assert.deepEqual(response, expectedResponse)
    })
    it('should not return error when validateParamFields called with valid request', function () {
        let requiredFields = ["test", "test1"]
        let expectedResponse: Array<String> = []
        let req = httpMocks.createRequest({
            params: {
                "test": "123",
                "test1": "456"
            }
        });

        let response = validateParamFields(requiredFields, req)
        assert.deepEqual(response, expectedResponse)
    })

    it('should not return error when validateBodyFields called with valid request', function () {
        let requiredFields = ["test", "test1"]
        let expectedResponse: Array<String> = []
        let req = httpMocks.createRequest({
            body: {
                "test": "123",
                "test1": "456"
            }
        });

        let response = validateBodyFields(requiredFields, req)
        assert.deepEqual(response, expectedResponse)
    })

    it('should return error when validateBodyFields called with invalid request', function () {
        let requiredFields = ["test", "test1"]
        let expectedResponse = ["please provide test1 field inside body"]
        let req = httpMocks.createRequest({
            body: {
                "test": "123"
            }
        });

        let response = validateBodyFields(requiredFields, req)
        assert.deepEqual(response, expectedResponse)
    })
})