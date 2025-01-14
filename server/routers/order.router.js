// - **Create Order for a User**: `POST /orders`
// - **Read Orders for a User**: `GET /orders/user/:userId`
// - **Read Order for a User**: `GET /orders/user/:userId/:orderId`
// - **Delete Order for a User**: `DELETE /orders/user/:userId/:orderId`

const Router = require("express").Router;

const orderRouter = new Router();

module.exports = orderRouter;
