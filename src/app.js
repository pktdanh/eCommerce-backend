const express = require('express')
const compression = require('compression')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

require("dotenv").config();

// init middlewares
app.use(morgan("dev"));
// morgan use to watch server: node --watch server.js (from node 19)
// morgan has 5 types: dev, combined, common, short, tiny
// morgan('combined') --> suitable for production mode because it can show IP address of user request

app.use(helmet()); // use to protect application
app.use(compression()); // use to reduce size of response

// init db
require("./dbs/init.mongodb");
// const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

// init routes
app.use("/", require("./routes"));

// handling errors

module.exports = app
