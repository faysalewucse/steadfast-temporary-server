const express = require("express");
const createOrder = require("../controllers/order/CreateOrder");
const invoiceValidator = require("../validators/invoiceValidator");
const runValidation = require("../validators");

const orderRouter = express.Router();

orderRouter.post("/create_order", invoiceValidator, runValidation, createOrder);

module.exports = orderRouter;
