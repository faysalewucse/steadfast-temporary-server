// routers/apiV1Router.js
const express = require("express");
const { successResponse } = require("../controllers/responseController");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  return successResponse(res, {
    statusCode: 200,
    message: "API information fetched successfully",
    payload: {
      status: "success",
      message: "Welcome to the SteadFast Temporary API",
      version: "1.0.0",
      description:
        "This API provides access to steadfast and operations.",
      timestamp: new Date(),
    },
  });
});

module.exports = rootRouter;