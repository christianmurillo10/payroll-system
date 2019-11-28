var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollWorkingDaysController = require('../controllers').payrollWorkingDays;

router.route('/create').post(authController.authorization, PayrollWorkingDaysController.create);
router.route('/compute').post(authController.authorization, PayrollWorkingDaysController.compute);

module.exports = router;
