const { successResponse } = require("../responseController");

const createBulkOrder = async (req, res, next) => {
  try {
    const orders = req.body;

    const consignments = orders.map(order => {
      const {
        invoice,
        recipient_name,
        recipient_phone,
        recipient_address,
        cod_amount,
        note,
      } = order;

      return {
        consignment_id: new Date().getMilliseconds(),
        invoice,
        tracking_code: "15BAEB8A",
        recipient_name,
        recipient_phone,
        recipient_address,
        cod_amount,
        status: "in_review",
        note,
      };
    });

    console.log(consignments);

    return res.status(200).json(
      consignments
    );
  } catch (error) {
    next(error);
  }
};

module.exports = createBulkOrder;
