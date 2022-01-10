const URLNotFound = (req, res, next) => {
  console.log("url not found");
  console.log(req.body);
  console.log(res.statusCode);
  const error = new Error(`${req.originalUrl} - page not found`);
  res.status(400);
  next(error);
};

const productNotFound = (error, req, res, next) => {
  // server could send a 200 status code but still have an error
  console.log(res.statusCode);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { URLNotFound, productNotFound };
