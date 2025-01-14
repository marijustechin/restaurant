const express = require("express");
const cors = require("cors");

// endpointai
const userRouter = require("./routers/user.router");
const menuRouter = require("./routers/menu.router");
const orderRouter = require("./routers/order.router");

// klaidos
const errorsMiddleware = require("./middlewares/error.middleware");

const app = express();

// Midlvares visokios
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/orders", orderRouter);

// sitoj eilej klaidos turi buti paskutines
app.use(errorsMiddleware);

module.exports = app;
