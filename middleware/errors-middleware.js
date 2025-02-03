const handleErrors = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.statusCode ? err.message : "An unexpected error occurred";

  res.status(status).json({ error: message });
};

module.exports = handleErrors;