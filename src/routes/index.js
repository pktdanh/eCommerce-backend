'use strict';

const express = require('express');
const router = express.Router();

// router.get("", (req, res, next) => {
//     return res.status(200).json({
//         message: "Welcome to the world!",
//     });
// });
router.use('/api/v1', require('./access'));

module.exports = router;
