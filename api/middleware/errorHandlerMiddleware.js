const errorHandlerMiddleware = (error, req, res, next) => {
  const { name, status, message } = error;
  res.status(error.status).json({
    name,
    status,
    message,
  });
};

module.exports = {
  errorHandlerMiddleware,
};
