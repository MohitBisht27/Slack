// ApiResponse is a helper class to send consistent success responses from the API
class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode; // HTTP status code (like 200, 201, 404, etc.)
    this.data = data; // Actual data you want to send in the response
    this.message = message; // A short message about the result (default: "success")
    this.success = statusCode < 400; // If status code is less than 400 → request was successful
  }
}

export { ApiResponse };
