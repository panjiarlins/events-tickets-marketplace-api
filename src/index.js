require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routers = require('./routes/index');
// eslint-disable-next-line no-unused-vars
const db = require('./models');

const PORT = process.env.PORT || 2500;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', routers.userRouter);
app.use('/events', routers.eventRouter);
app.use('/vouchers', routers.voucherRouter);
app.use('/orders', routers.orderRouter);
app.use('/reviews', routers.reviewRouter);

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
  // db.sequelize.sync({ alter: true });
});
