// ApiError is a custom error class made to handle API errors in a cleaner way
class ApiError extends Error {
  constructor(
    statsCode, // HTTP status code (like 400, 404, 500)
    message = "Something went Wrong", // Default error message if none is given
    errors = [], // Optional array of detailed errors
    stack = "" // Optional stack trace for debugging
  ) {
    super(message); // Calls the parent (Error) class constructor
    this.statsCode = statsCode; // Saves the HTTP status code
    this.data = null; // Extra data (if needed) — kept null by default
    this.message = message; // Stores the error message
    this.success = false; // Tells that the API call failed
    this.errors = errors; // Stores extra error details (like validation errors)

    // If stack trace is provided, use it; otherwise, auto-generate one
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Exporting the ApiError class so it can be used in other files
export { ApiError };
