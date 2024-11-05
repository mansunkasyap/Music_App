class ApiResponse extends Response{
    constructor(statusCode, data, message="success"){
        super(message)
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode<=400
    }
}
export {ApiResponse}