export class ValidationError extends Error {
    constructor(errors: string[]) {
        super(JSON.stringify(errors))
    }
}
