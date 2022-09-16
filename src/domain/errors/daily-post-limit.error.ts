export class DailyPostLimitError extends Error {
    constructor(user: string) {
        super(`${user} reached the maximum limit of posts`)
    }
}
