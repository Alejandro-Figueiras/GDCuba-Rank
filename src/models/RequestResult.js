export default class RequestResult {
    constructor({result, error, message}) {
        this.result = result;
        this.error = error;
        this.message = message;
    }
}