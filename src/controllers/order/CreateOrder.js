const { successResponse } = require("../responseController");

const createOrder = async (req, res, next) => {
  try {
    const {
      invoice,
      recipient_name,
      recipient_phone,
      recipient_address,
      cod_amount,
      note,
    } = req.body;

    console.log(req.body);

    return successResponse(res, {
      statusCode: 200,
      message: "Consignment has been created successfully.",
      payload: {
        consignment: {
          consignment_id: new Date().getMilliseconds(),
          invoice: invoice,
          tracking_code: "15BAEB8A",
          recipient_name,
          recipient_phone,
          recipient_address,
          cod_amount,
          status: "in_review",
          note,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOrder;