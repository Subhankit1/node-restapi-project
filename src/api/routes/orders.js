const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

//import order controller
const OrdersController = require('../controller/order');

//Handle imcoming req of orders
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order );

router.get('/:orderId', checkAuth, OrdersController.get_by_id);

router.delete('/:orderId', checkAuth, OrdersController.delete_order_byid );

module.exports = router;