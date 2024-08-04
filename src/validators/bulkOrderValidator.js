const { body } = require("express-validator");
const Order = require("../models/Order");

const bulkOrderValidator = [
  body('orders.*.invoice')
    .isString()
    .withMessage("Invoice must be a string")
    .notEmpty()
    .withMessage("Invoice is required")
    .isLength({ max: 50 })
    .withMessage("Invoice must be within 50 characters")
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage("Invoice can be alpha-numeric including hyphens and underscores")
    .custom(async (value) => {
      const order = await Order.findOne({ invoice: value });
      if (order) {
        throw new Error("Invoice must be unique");
      }
      return true;
    }),

  body('orders.*.recipient_name')
    .isString()
    .withMessage("Recipient name must be a string")
    .notEmpty()
    .withMessage("Recipient name is required")
    .isLength({ max: 100 })
    .withMessage("Recipient name must be within 100 characters"),

  body('orders.*.recipient_phone')
    .isString()
    .withMessage("Recipient phone must be a string")
    .notEmpty()
    .withMessage("Recipient phone is required")
    .matches(/^\d{11}$/)
    .withMessage("Recipient phone must be 11 digits"),

  body('orders.*.recipient_address')
    .isString()
    .withMessage("Recipient address must be a string")
    .notEmpty()
    .withMessage("Recipient address is required")
    .isLength({ max: 250 })
    .withMessage("Recipient address must be within 250 characters"),

  body('orders.*.cod_amount')
    .isNumeric()
    .withMessage("Cash on delivery amount must be numeric")
    .notEmpty()
    .withMessage("Cash on delivery amount is required")
    .isFloat({ min: 0 })
    .withMessage("Cash on delivery amount can’t be less than 0"),

  body('orders.*.note')
    .optional()
    .isString()
    .withMessage("Note must be a string")
    .isLength({ max: 500 })
    .withMessage("Note must be within 500 characters"),
];

module.exports = bulkOrderValidator;
