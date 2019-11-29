var express = require('express');
var router = express.Router();
const authController = require('../controllers').auth;
const PayrollNightDifferentialsController = require('../controllers').payrollNightDifferentials;

router.route('/create').post(authController.authorization, PayrollNightDifferentialsController.create);
router.route('/compute').post(authController.authorization, PayrollNightDifferentialsController.compute);

module.exports = router;
