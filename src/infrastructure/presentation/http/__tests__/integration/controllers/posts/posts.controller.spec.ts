import supertest from 'supertest'
import httpApp from '../../../../routes'
describe('PostsController', () => {
    describe(`[GET] /`, () => {
        it('should return an array of results and pagination with total', async () => {
            const response = await supertest(httpApp).get(`/posts`).expect(200)

            expect(Array.isArray(response.body.results)).toBe(true)
            expect(typeof response.body?.pagination?.total).toBe('number')
        })
        it.todo('should return an array of results and pagination')

        describe('pagination', () => {
            it.todo('should apply limit')
            it.todo('should apply skip')
        })
        describe('filters', () => {
            it.todo('should filter by authorId')
            it.todo('should filter by createdAfter')
            it.todo('should filter by createdBefore')
            it.todo('should filter by createdBefore')
        })
        describe('expands', () => {
            it.todo('should include relatedPost key')
        })
        describe('expands', () => {
            it.todo('should sort by createdAt')
        })
    })
})
