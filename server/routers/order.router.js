const Router = require("express").Router;
const orderController = require("../controllers/order.controller");

const orderRouter = new Router();

// - **Create Order for a User**: `POST /orders`
orderRouter.post("/", orderController.createOrder);
// - **Read Orders for a User**: `GET /orders/user/:userId`
orderRouter.get("/user/:userId", orderController.getAllOrders);
// - **Read Order for a User**: `GET /orders/user/:userId/:orderId`
orderRouter.get("/user/:userId/:orderId", orderController.getOrder);
// - **Delete Order for a User**: `DELETE /orders/user/:userId/:orderId`
orderRouter.delete("/user/:userId/:orderId", orderController.deleteOrder);

module.exports = orderRouter;
