class ApiResponse {
  constructor(statusCode, data, message) {
    this.success = statusCode < 400;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ApiResponse;
