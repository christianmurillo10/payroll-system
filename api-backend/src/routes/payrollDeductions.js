var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollDeductionsController = require('../controllers').payrollDeductions;

router.route('/create').post(authController.authorization, PayrollDeductionsController.create);
router.route('/compute').post(authController.authorization, PayrollDeductionsController.compute);

module.exports = router;
