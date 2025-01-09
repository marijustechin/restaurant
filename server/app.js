const express = require('express');
const cors = require('cors');

const app = express();

// endpointai
const userRouter = require('./routers/user.router');

// Midlvares visokios
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/v1/users', userRouter);

module.exports = app;
