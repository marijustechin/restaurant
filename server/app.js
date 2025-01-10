const express = require("express");
const cors = require("cors");

// endpointai
const userRouter = require("./routers/user.router");

// klaidos
const errorsMiddleware = require("./middlewares/error.middleware");

const app = express();

// Midlvares visokios
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/v1/users", userRouter);

// sitoj eilej klaidos turi buti paskutines
app.use(errorsMiddleware);

module.exports = app;
