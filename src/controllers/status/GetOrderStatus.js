const getOrderStatus = async (req, res, next) => {
  try {
    const { consignmentId } = req.params;

    console.log({ consignmentId });

    return res.status(200).json({
      status: 200,
      delivery_status: "delivered",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOrderStatus;
