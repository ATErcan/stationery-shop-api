class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};

const createValidationError = (error) => {
  if (error.name === "ValidationError") {
    return createError(
      `Validation Error: ${Object.values(error.errors)
        .map((e) => e.message)
        .join(", ")}`,
      400
    );
  } 
}

module.exports = { createError, createValidationError };