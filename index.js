const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '.env') });
const express = require('express');
const app = express();
const cors = require('cors');
const bearerToken = require('express-bearer-token')
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(bearerToken());
// #destination file storage(image/pdf/document)
app.use("/", express.static(__dirname + "/public"));

// DB Check Connection

app.get('/', (req, res) => {
  res.status(200).send('<h1>TICKET FESTIVAL</h1>');
})

// Routing Config
// const authRouter = require('./src/routers/authRouter');
// app.use('/auth', authRouter);

// const usersRouter = require('./src/routers/usersRouter');
// app.use('/user', usersRouter);

// const productRouter = require('./src/routers/productRouter');
// app.use('/product', productRouter);

// const transactionRouter = require('./src/routers/transactionRouter');
// app.use('/transaction', transactionRouter);

const reportRouter = require('./src/routers/reportRouter');
app.use('/report', reportRouter);

// Error Handling
app.use((err, req, res, next) => {
  // Error handling middleware functionality
  console.log(err); // log the error
  const status = err.status || 500;
  // send back an easily understandable error message to the caller
  res.status(status).send(err);
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR:`, err);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});