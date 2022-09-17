export abstract class CustomError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details: any
    abstract name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(details: any) {
        super(JSON.stringify(details))
        this.details = details
    }
}
