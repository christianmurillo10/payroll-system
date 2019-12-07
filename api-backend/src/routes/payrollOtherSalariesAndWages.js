var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollOtherSalariesAndWagesController = require('../controllers').payrollOtherSalariesAndWages;

router.route('/create').post(authController.authorization, PayrollOtherSalariesAndWagesController.create);

module.exports = router;
