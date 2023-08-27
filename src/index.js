require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routers = require('./routes/index');
const db = require('./models');

const PORT = process.env.PORT || 2500;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', routers.userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
  db.sequelize.sync({ alter: true });
});
