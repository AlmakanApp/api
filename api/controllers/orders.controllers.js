const ordersController = {};
const Orders = require("../models/sliders.model");

ordersController.getAll = async (req, res) => {
  try {
    let orders = await Orders.paginate();
    res.status(200).send({
      code: 200,
      message: "Successful",
      data: orders,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

// Add Orders In Mongodb
ordersController.addOrder = async (req, res) => {
  try {
    const body = req.body;
    const orders = new Orders(body);
    const result = await orders.save();
    res.status(200).send({
      code: 200,
      message: "orders Added Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .send({ message: "orders Added Successfully", error });
  }
};

// Update Data
ordersController.updateOrder = async (req, res) => {
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: "ID missing",
    });
  }
  try {
    const _id = req.params._id;
    Orders.findOneAndUpdate(
      { _id: _id },
      {
        $set: req.body.status,
      },
      {
        returnNewDocument: true,
      },
      function (error, result) {
        res.status(200).send({
          code: 200,
          message: "Data Updated Successfully",
        });
      }
    );
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

// Delete Methods
ordersController.deleteOrder = async (req, res) => {
  const _id = req.params._id;
  if (!_id) {
    Fu;
    res.status(500).send({
      message: "ID missing",
    });
  } else {
    Orders.findByIdAndDelete(_id, function (err) {
      res.status(200).send({
        code: 200,
        message: "deleted Successful",
      });
    });
  }
};

module.exports = ordersController;
