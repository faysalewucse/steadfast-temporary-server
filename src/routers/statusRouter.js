const express = require("express");
const getOrderStatus = require("../controllers/status/GetOrderStatus");

const statusRouter = express.Router();

statusRouter.get("/:consignmentId", getOrderStatus);

module.exports = statusRouter;
