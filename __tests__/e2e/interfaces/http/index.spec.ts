import supertest from 'supertest'
import httpApp from '../../../../src/interfaces/http/routes'

describe('PingController', () => {
    describe(`[GET] /ping`, () => {
        it('should return ping', async () => {
            const response = await supertest(httpApp).get(`/ping`).expect(200)

            expect(response.text).toEqual('pong')
        })
    })
})
