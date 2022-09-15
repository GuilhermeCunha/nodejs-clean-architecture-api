export interface IValidator<Input> {
    validate(input: Input): string[]
}
