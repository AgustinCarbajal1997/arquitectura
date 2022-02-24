const invalidRequest = (req, res) => {
  res.json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      statusCode: 404,
      stack: `${req.originalUrl}`,
    },
  });
};

const errorHandle = (res, error) => {
  return res
    .status(error.status || 500)
    .json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
};
module.exports = {
  invalidRequest,
  errorHandle
};
