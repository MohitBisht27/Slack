// asyncHandler is a helper that catches errors in async route functions
const asyncHandler = (requestHandler) => {
  // It returns a new function that Express will use for handling the request
  return (req, res, next) => {
    // Runs the requestHandler and automatically catches any error
    // (so you don't need to write try-catch in every route)
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// Exporting the function so it can be used in other files
export { asyncHandler };
