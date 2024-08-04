const express = require("express");
const createOrder = require("../controllers/order/CreateOrder");
const invoiceValidator = require("../validators/invoiceValidator");
const runValidation = require("../validators");
const createBulkOrder = require("../controllers/order/CreateBulkOrder");
const bulkOrderValidator = require("../validators/bulkOrderValidator");

const orderRouter = express.Router();

orderRouter.post("/", invoiceValidator, runValidation, createOrder);
orderRouter.post("/bulk-order", bulkOrderValidator, runValidation, createBulkOrder);

module.exports = orderRouter;
