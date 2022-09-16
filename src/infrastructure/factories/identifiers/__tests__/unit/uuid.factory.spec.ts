import cripto from 'crypto'
import { UUIDFactory } from '../../uuid.factory'

describe('UUIDFactory', () => {
    describe('create', () => {
        it('should call randomUUID and return it', () => {
            const mockedValue = 'd5f44408-8d1b-45b7-99c9-1d7d4e8f7b1f'

            const spy = jest
                .spyOn(cripto, 'randomUUID')
                .mockReturnValue(mockedValue)

            const factory = new UUIDFactory()
            const result = factory.create()

            expect(spy).toBeCalled()
            expect(result).toEqual(mockedValue)

            spy.mockRestore()
        })
    })
})
