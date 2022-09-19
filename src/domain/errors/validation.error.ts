export class ValidationError extends Error {
    errors: string[]
    constructor(errors: string[]) {
        super(JSON.stringify(errors))
        this.errors = errors
    }
}
