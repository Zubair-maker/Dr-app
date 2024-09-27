class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); 
    // Assign custom properties for the ApiError class
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    // Capture the stack trace, either using the provided stack or the default error stack
    if (stack) {
      this.stack = stack; // Assign the provided stack trace
    } else {
      // Capture the current stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

