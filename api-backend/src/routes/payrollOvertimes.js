var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollOvertimesController = require('../controllers').payrollOvertimes;

router.route('/create').post(authController.authorization, PayrollOvertimesController.create);
router.route('/compute').post(authController.authorization, PayrollOvertimesController.compute);

module.exports = router;
