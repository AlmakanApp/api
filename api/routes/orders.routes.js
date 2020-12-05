const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders.controllers');

// get Requests
router.get("/", orderController.getAll);

// post Requests
router.post("/add", orderController.addOrder);

// put Requests
router.put("/update/order/:_id", orderController.updateOrder);

// delete Requests
router.delete("/:_id", orderController.deleteOrder);

module.exports = router;


