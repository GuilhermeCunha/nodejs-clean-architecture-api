import { randomUUID } from 'crypto'
import { IIdentifierFactory } from '../../../domain/ports/identifier-factory'

export class UUIDFactory implements IIdentifierFactory {
    create(): string {
        return randomUUID()
    }
}
