const errorResponse = (
  res,
  { status = 500, message = "Internal Server Error" }
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

const successResponse = (
  res,
  { status = 200, message = "Success", consignment = {} }
) => {
  return res.status(status).json({
    success: true,
    message,
    consignment,
  });
};

module.exports = {
  errorResponse,
  successResponse,
};
