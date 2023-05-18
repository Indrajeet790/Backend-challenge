//  Not found

const notFound = (req, resp, next) => {
  const error = new Error(`not found:${req.originalUrl}`);
  resp.status(404);
  next(error);
};

// error handler

const errorHandler = (err, req, resp, next) => {
  const statusCode = resp.statuscode == 200 ? 500 : resp.statuscode;
  resp.status(statusCode);
  resp.json({
    message: err?.message,
    stack: err?.stack,
  });
};
module.exports = { errorHandler, notFound };
