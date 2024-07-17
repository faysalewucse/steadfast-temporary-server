const mongoose = require("mongoose");
const Counter = require("./Counter");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  featuredImage: {
    type: String,
    required: [true, "Featured image is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  offerPrice: {
    type: Number,
    default: null,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  size: {
    type: Number,
    required: [true, "Size is required"],
  },
  sku: {
    type: String,
    required: [true, "SKU is required"],
  },
});

const orderSummarySchema = new mongoose.Schema({
  subTotal: {
    type: Number,
    required: [true, "Subtotal is required"],
  },
  totalQuantity: {
    type: Number,
    required: [true, "Total quantity is required"],
  },
  deliveryCharge: {
    type: Number,
    required: [true, "Delivery charge is required"],
  },
  finalPrice: {
    type: Number,
    required: [true, "Final price is required"],
  },
});

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    orderId: {
      type: String,
      unique: true,
    },
    cartItems: {
      type: [cartItemSchema],
      required: [true, "Cart items are required"],
    },
    orderSummary: {
      type: orderSummarySchema,
      required: [true, "Order summary is required"],
    },
    guest: {
      type: Boolean,
      required: [true, "Guest field is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return !this.guest;
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const order = this;

  // Format the date as DDMMYYYY
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = today.getFullYear();
  const formattedDate = `${day}${month}${year}`;

  try {
    const counter = await Counter.findOneAndUpdate(
      { date: formattedDate },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const orderNumber = counter.seq;
    order.orderId = `${formattedDate}-${orderNumber}`;

    next();
  } catch (error) {
    next(error);
  }
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
